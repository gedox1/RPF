import { useState } from 'react'
import { Users, MapPin, FileSpreadsheet, ShieldCheck, Settings, Search, Menu } from 'lucide-react'

const stats = [
  { label: 'Registered members', value: '—', note: 'Connect database to load totals', icon: Users },
  { label: 'Cells covered', value: '4', note: 'Rukiri I, Rukiri II, Nyabisindu, Nyarutarama', icon: MapPin },
  { label: 'Import batches', value: '0', note: 'No spreadsheet imported yet', icon: FileSpreadsheet },
  { label: 'Security status', value: 'Setup needed', note: 'Configure authentication and database policies', icon: ShieldCheck }
]

export default function App() {
  const [section, setSection] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = ['Overview', 'Members', 'Register member', 'Excel import', 'Reports', 'User management', 'Activity log', 'Settings']
  return <div className="shell">
    <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="mark">RPF</div><div><b>RPF_MIS</b><small>REAMERA</small></div></div>
      <div className="nav-title">WORKSPACE</div>
      {nav.map(item => <button key={item} className={section === item ? 'nav active' : 'nav'} onClick={() => {setSection(item); setMenuOpen(false)}}>{item}</button>)}
      <div className="side-note">Secure membership management<br/>Starter environment</div>
    </aside>
    <main className="main">
      <header><button className="menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20}/></button><div><span className="eyebrow">MEMBERSHIP INFORMATION SYSTEM</span><h1>{section}</h1></div><div className="user-pill">Admin setup required</div></header>
      {section === 'Overview' ? <>
        <section className="welcome"><div><span className="eyebrow light">REMERA · GASABO</span><h2>Welcome to RPF_MIS REMERA</h2><p>Your central workspace for member registration, records, imports and reporting.</p></div><div className="welcome-symbol">RPF</div></section>
        <section className="stats">{stats.map(({label,value,note,icon:Icon}) => <article className="stat" key={label}><div className="stat-top"><span>{label}</span><Icon size={19}/></div><strong>{value}</strong><small>{note}</small></article>)}</section>
        <section className="panel"><div className="panel-head"><div><h3>Getting started</h3><p>Complete these steps before entering real member information.</p></div><ShieldCheck/></div>
          <ol className="steps"><li><b>Configure the database</b><span>Create a private backend and apply database/schema.sql.</span></li><li><b>Set up administrator access</b><span>Provision the first administrator securely on the server.</span></li><li><b>Import the existing register</b><span>Use the template, preview records, resolve duplicates and approve the import.</span></li><li><b>Test permissions and backups</b><span>Verify each role can access only the information it is authorized to use.</span></li></ol>
        </section>
      </> : <section className="panel placeholder"><h3>{section}</h3><p>This section is a scaffold. Connect the secured backend and implement its role permissions before using it with real member records.</p>{section === 'Excel import' && <p>Use <code>templates/initial_members_import.csv</code> as the column reference. The original Excel file is not included in this package.</p>}</section>}
      <footer>RPF_MIS REMERA · Starter kit · Sample interface contains no real member records</footer>
    </main>
  </div>
}
