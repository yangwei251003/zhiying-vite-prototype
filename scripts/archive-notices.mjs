import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync,realpathSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,relative,resolve} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
const cli=process.env.npm_execpath;
if(!cli)throw new Error('Run npm run licenses:generate so the actual npm CLI is used.');
const paths=execFileSync(process.execPath,[cli,'ls','--omit=dev','--all','--parseable'],{cwd:root,encoding:'utf8',maxBuffer:8e6}).trim().split(/\r?\n/).filter(p=>resolve(p)!==root);
const groups=new Map(),inventory=[],missing=[];
function notices(directory){
 const result=[];
 const walk=dir=>{for(const e of readdirSync(dir,{withFileTypes:true})){
  if(e.name==='node_modules'||e.name==='.git')continue;
  const p=join(dir,e.name);
  if(e.isDirectory())walk(p);
  else if(e.isFile()&&/^(?:licen[sc]e|copying|notice)(?:$|[._-])/i.test(e.name))result.push({name:relative(directory,p).replaceAll('\\','/'),text:readFileSync(p,'utf8')});
 }};walk(directory);return result;
}
for(const directory of new Set(paths.map(p=>realpathSync(p)))){
 const pkg=JSON.parse(readFileSync(join(directory,'package.json'),'utf8')),id=`${pkg.name}@${pkg.version}`;
 let list=notices(directory);
 if(!list.length&&pkg.license==='MIT'){
  if((pkg.name==='@next/env'||pkg.name.startsWith('@next/swc-'))&&pkg.version==='16.4.3')list=[{name:'UPSTREAM-NEXT-SAME-VERSION:license.md',text:readFileSync(join(root,'node_modules/next/license.md'),'utf8')}];
  if(pkg.name==='client-only'&&pkg.version==='0.0.1')list=[{name:'UPSTREAM-REACT:LICENSE (manifest links facebook/react)',text:readFileSync(join(root,'node_modules/react/LICENSE'),'utf8')}];
  if(pkg.name==='@ant-design/icons-svg'&&pkg.version==='4.4.2')list=[{name:'UPSTREAM-EXACT-GIT-HEAD:ant-design-icons-038764e4-LICENSE',text:readFileSync(join(root,'licenses/upstream/ant-design-icons-038764e4-LICENSE.txt'),'utf8')}];
  if(pkg.name==='toggle-selection'&&pkg.version==='1.0.6'){
    const standard=readFileSync(join(root,'node_modules/react/LICENSE'),'utf8').split('Permission is hereby granted')[1];
    if(!standard)throw new Error('Missing complete standard MIT terms');
    list=[{name:'DECLARED-STANDARD-MIT-SUPPLEMENT:manifest+README-credits',text:'MIT License\n\nThe installed toggle-selection@1.0.6 tarball declares MIT but supplies no original LICENSE file. Package author from its manifest: sudodoki <smd.deluzion@gmail.com> (sudodoki.name). Its README credits Aleksej Shvajka (@shvaikalesh). No unavailable copyright year or statement is invented here. The following complete standard MIT terms supplement that declaration; this is not presented as an upstream LICENSE file.\n\nPermission is hereby granted'+standard}];
  }
 }
 if(!list.length)missing.push(id);
 inventory.push({id,license:pkg.license??'UNKNOWN',sources:list.map(n=>n.name)});
 for(const n of list){const text=n.text.replace(/\r\n/g,'\n').trim(),hash=createHash('sha256').update(text).digest('hex'),record=groups.get(hash)??{text,packages:new Set(),sources:new Set()};record.packages.add(id);record.sources.add(n.name);groups.set(hash,record);}
}
const lines=['# Production dependency notices','','Generated from `npm ls --omit=dev --all --parseable`. Nested bundled LICENSE/COPYING/NOTICE files are included; identical texts are deduplicated. This describes this installed platform; other platform packages retain their own original licenses when installed. No dependency binaries are copied into this repository.','','Missing tarball notices have only the exact reviewed upstream or clearly labelled declared-standard supplements identified in the inventory. The Ant Design text is from the npm version gitHead. The toggle-selection supplement preserves manifest/README attribution without inventing an unavailable original copyright statement.','','- Packages: '+inventory.length,'- Distinct texts: '+groups.size,'- Unresolved: '+missing.length,'','## Inventory','','| Package | Declared license | Original notice paths or reviewed upstream supplement |','|---|---|---|'];
for(const p of inventory.sort((a,b)=>a.id.localeCompare(b.id)))lines.push(`| ${p.id} | ${p.license} | ${p.sources.join(', ')} |`);
for(const [hash,n] of [...groups.entries()].sort((a,b)=>a[0].localeCompare(b[0])))lines.push('','## '+[...n.packages].sort().join(', '),'','Sources: '+[...n.sources].sort().join(', '),'','SHA256: `'+hash+'`','','````text',n.text,'````');
mkdirSync(join(root,'licenses'),{recursive:true});writeFileSync(join(root,'licenses/NPM_NOTICES.md'),lines.join('\n')+'\n');
console.log(JSON.stringify({packages:inventory.length,texts:groups.size,unresolved:missing}));if(missing.length)process.exitCode=1;
