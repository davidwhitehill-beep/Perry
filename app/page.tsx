const people = [
  {
    name: "Mara Vale",
    place: "Portland, Oregon",
    status: "Organizing",
    comfort: "10-14 miles/day",
    topics: ["libraries", "architecture", "rivers"],
    bio: "Editor, patient walker, and collector of local histories. Interested in libraries, water, and practical utopias."
  },
  {
    name: "Jon Bell",
    place: "Nomadic",
    status: "Ready to Join",
    comfort: "8-12 miles/day",
    topics: ["cartography", "rail", "public space"],
    bio: "Maps person. Likes slow routes, older infrastructure, and evenings that drift into good questions."
  },
  {
    name: "Anika Rao",
    place: "Cambridge, Massachusetts",
    status: "Interested",
    comfort: "6-10 miles/day",
    topics: ["civic tech", "memory", "libraries"],
    bio: "Works between libraries and civic technology. Prefers unhurried mornings and shared notes."
  }
];

const walks = [
  {
    title: "Library Futures Walk",
    status: "Critical mass",
    place: "Western Massachusetts",
    date: "Spring 2027",
    theme: "Libraries, civic memory, and small-town public rooms",
    summary: "A four-day walk between town libraries, reading rooms, and river paths.",
    approved: 5,
    max: 8,
    min: 5,
    commitment: "Draft Route"
  },
  {
    title: "Croatia Coastal Questions",
    status: "Gathering interest",
    place: "Dalmatian Coast, Croatia",
    date: "Sep-Nov 2027",
    theme: "Coastlines, tourism, and stewardship",
    summary: "An exploratory coastal walk around care, pressure, and beauty in popular places.",
    approved: 2,
    max: 10,
    min: 6,
    commitment: "Concept"
  },
  {
    title: "Shikoku Slow Study",
    status: "Idea",
    place: "Shikoku, Japan",
    date: "Timing TBD",
    theme: "Pilgrimage, hospitality, and attention",
    summary: "A future walking salon inspired by pilgrimage routes and slow observation.",
    approved: 1,
    max: 7,
    min: 4,
    commitment: "Concept"
  }
];

const formClass = "min-h-10 rounded border border-ink bg-white/75 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-sea";

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-8" id={title.toLowerCase().replaceAll(" ", "-")}> 
      <p className="mb-2 text-xs font-black uppercase text-route">{eyebrow}</p>
      <div className="border-t-2 border-ink pt-3">
        <h2 className="text-3xl font-black leading-tight sm:text-4xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1 text-sm font-bold"><span>{label}</span>{children}</label>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="field-card p-4"><h3 className="mb-3 border-b border-ink pb-2 text-lg font-black uppercase">{title}</h3>{children}</div>;
}

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-5">
      <header className="flex flex-col gap-4 border-b-2 border-ink pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-end gap-3">
          <div className="border-2 border-ink bg-route px-3 py-2 text-2xl font-black leading-none text-white shadow-[3px_3px_0_rgba(29,37,32,0.25)]">Perry</div>
          <p className="font-bold text-[#687064]">Private walking field guide</p>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-black">
          {["Walks", "People", "Propose", "Organizer", "Admin"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded border border-ink bg-white/70 px-3 py-2 hover:bg-ochre/35">{item}</a>)}
        </nav>
      </header>

      <section className="grid min-h-[72vh] gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="stamp text-sea">Invite only</span>
          <h1 className="mt-4 max-w-3xl text-6xl font-black leading-none sm:text-7xl">Perry</h1>
          <p className="mt-4 max-w-xl text-2xl font-bold leading-9">A private network for organizing and joining walking salons.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#walks" className="rounded border-2 border-ink bg-ochre px-4 py-3 font-black shadow-[3px_3px_0_rgba(29,37,32,0.25)]">Browse walks</a>
            <a href="#people" className="rounded border-2 border-ink bg-white/70 px-4 py-3 font-black">Find people</a>
            <a href="#propose" className="rounded border-2 border-ink bg-white/70 px-4 py-3 font-black">Propose a walk</a>
          </div>
        </div>
        <div className="field-card overflow-hidden">
          <div className="map-grid relative min-h-[430px] p-5">
            <div className="absolute left-[18%] top-[25%] h-4 w-4 rounded-full border-2 border-ink bg-route" />
            <div className="absolute left-[47%] top-[42%] h-4 w-4 rounded-full border-2 border-ink bg-sea" />
            <div className="absolute left-[70%] top-[68%] h-4 w-4 rounded-full border-2 border-ink bg-ochre" />
            <div className="absolute left-[21%] top-[28%] h-[2px] w-[31%] rotate-[23deg] bg-ink" />
            <div className="absolute left-[49%] top-[45%] h-[2px] w-[31%] rotate-[39deg] bg-ink" />
            <div className="absolute bottom-5 left-5 right-5 border-2 border-ink bg-paper/90 p-4">
              <p className="text-sm font-black uppercase">Field notes</p>
              <p className="mt-2 text-sm font-bold leading-6">Small groups gathered around a place, a route, and a shared conversation.</p>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Access" title="Member Access">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title="Magic link login"><div className="grid gap-3"><Field label="Authorized or invited email"><input className={formClass} placeholder="you@example.com" /></Field><button className="rounded border-2 border-ink bg-ochre px-4 py-3 font-black">Send magic link</button></div></Card>
          <Card title="Onboarding"><ul className="grid gap-2 text-sm font-bold leading-6"><li>Name, age range, and location status</li><li>Location visibility controls</li><li>Optional bio and private contact preferences</li></ul></Card>
          <Card title="Invite chain"><p className="text-sm font-bold leading-6">Seeded members receive one invite credit. Invites are single-use, cannot be self-addressed, and remain visible to admins.</p></Card>
        </div>
      </Section>

      <Section eyebrow="Walks" title="Walks">
        <div className="mb-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="field-card overflow-hidden"><div className="border-b border-ink bg-white/50 p-3 font-black uppercase">World map view</div><div className="map-grid relative min-h-[300px]">{walks.map((walk, index) => <div key={walk.title} className="absolute rounded border-2 border-ink bg-route px-2 py-1 text-xs font-black text-white" style={{ left: `${18 + index * 26}%`, top: `${30 + index * 16}%` }}>{walk.place}</div>)}</div></div>
          <Card title="Sorting board"><div className="grid gap-2 text-sm font-bold">{walks.map((walk) => <div key={walk.title} className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-ink/30 py-2"><span>{walk.title}</span><span>{walk.approved}/{walk.max}</span><span>{walk.status}</span></div>)}</div></Card>
        </div>
        <div className="grid gap-4">{walks.map((walk) => <article key={walk.title} className="field-card grid gap-4 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="stamp text-route">{walk.status}</span><h3 className="mt-3 text-2xl font-black leading-tight">{walk.title}</h3><p className="mt-1 text-sm font-bold text-[#687064]">{walk.theme}</p></div><span className="border border-ink bg-ochre px-2 py-1 text-xs font-black uppercase">{walk.commitment}</span></div><p className="font-semibold leading-6">{walk.summary}</p><div className="grid gap-2 text-sm font-bold sm:grid-cols-4"><span>{walk.place}</span><span>{walk.date}</span><span>{walk.approved}/{walk.max} approved</span><span>Min {walk.min} for takeoff</span></div></article>)}</div>
      </Section>

      <Section eyebrow="Directory" title="People">
        <div className="mb-5 grid gap-3 border-2 border-ink bg-paper-deep/70 p-3 md:grid-cols-4"><input className={formClass} placeholder="Search topic or person" /><input className={formClass} placeholder="Region" /><select className={formClass}><option>Any availability</option><option>Spring 2027</option></select><button className="rounded border border-ink bg-white/70 px-3 font-black">Filter</button></div>
        <div className="grid gap-4 md:grid-cols-3">{people.map((person) => <article key={person.name} className="field-card p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-2xl font-black">{person.name}</h3><p className="text-sm font-bold text-[#687064]">{person.place}</p></div><span className="stamp text-sea">{person.status}</span></div><p className="mt-4 text-sm font-semibold leading-6">{person.bio}</p><div className="mt-4 flex flex-wrap gap-2">{person.topics.map((topic) => <span key={topic} className="rounded border border-ink bg-white/60 px-2 py-1 text-xs font-black">{topic}</span>)}</div><p className="mt-4 text-sm font-black">Comfort: {person.comfort}</p></article>)}</div>
      </Section>

      <Section eyebrow="Proposal" title="Propose">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Walk proposal form"><div className="grid gap-3"><Field label="Title"><input className={formClass} placeholder="Library Futures Walk" /></Field><Field label="Location flexibility"><select className={formClass}><option>Exact</option><option>Approximate</option><option>Region only</option><option>Nomadic</option><option>TBD</option></select></Field><Field label="Full description"><textarea className={formClass} rows={5} placeholder="Why this walk exists, what participants experience, and what makes it distinct." /></Field><Field label="Organizer framework"><textarea className={formClass} rows={5} placeholder="Daily rhythm, conversation structure, logistics approach, and expectations." /></Field></div></Card>
          <Card title="AI draft assistant"><div className="grid gap-3"><p className="border border-ink bg-ochre/25 p-3 text-sm font-black">AI-assisted draft - please review for accuracy.</p><Field label="Known details"><textarea className={formClass} rows={5} defaultValue="Western Massachusetts, spring 2027, libraries, civic memory, 8-12 miles per day" /></Field><div className="flex flex-wrap gap-2 text-sm font-black">{["Make shorter", "More poetic", "More practical", "Less formal", "Emphasize landscape"].map((x) => <button key={x} className="rounded border border-ink bg-white/70 px-3 py-2">{x}</button>)}</div><button className="rounded border-2 border-ink bg-sea px-4 py-3 font-black text-white">Generate editable draft</button></div></Card>
        </div>
      </Section>

      <Section eyebrow="Organizer" title="Organizer">
        <Card title="Approval dashboard"><div className="grid gap-4"><div className="grid gap-3 sm:grid-cols-4"><div className="border border-ink bg-white/60 p-3 font-black">Approved: 5</div><div className="border border-ink bg-white/60 p-3 font-black">Open slots: 3</div><div className="border border-ink bg-white/60 p-3 font-black">Minimum: 5</div><div className="border border-ink bg-ochre p-3 font-black">Critical mass reached</div></div><Field label="Planning document URL"><input className={formClass} defaultValue="https://docs.example.com/library-futures" /></Field><div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-sm font-bold"><thead><tr className="border-b-2 border-ink"><th className="p-2">Participant</th><th className="p-2">Email</th><th className="p-2">Note</th><th className="p-2">Status</th><th className="p-2">Controls</th></tr></thead><tbody>{people.map((person, i) => <tr key={person.name} className="border-b border-ink/30"><td className="p-2">{person.name}</td><td className="p-2">member{i + 1}@example.com</td><td className="p-2">Interested in helping with route notes.</td><td className="p-2">{i === 2 ? "interested" : "approved"}</td><td className="p-2"><button className="rounded border border-ink bg-white px-2 py-1 text-xs font-black">Approve</button></td></tr>)}</tbody></table></div><button className="rounded border-2 border-ink bg-sea px-4 py-3 font-black text-white">Clear for takeoff</button></div></Card>
      </Section>

      <Section eyebrow="Admin" title="Admin">
        <div className="grid gap-5 lg:grid-cols-3"><Card title="Authorized emails"><textarea className={formClass} rows={6} defaultValue={"mara@example.com\njon@example.com\nanika@example.com"} /></Card><Card title="Invites"><div className="grid gap-2 text-sm font-bold"><p>PERRY-MAP-27 - pending</p><p>PERRY-RIVER-09 - accepted</p><p>Admins can revoke invites and view invite chains.</p></div></Card><Card title="Security model"><ul className="grid gap-2 text-sm font-bold leading-6"><li>Invite-only access</li><li>Server-side contact visibility</li><li>Organizer/admin approval controls</li><li>Planning documents only after takeoff</li></ul></Card></div>
      </Section>

      <footer className="border-t-2 border-ink py-6 text-sm font-bold text-[#687064]">Perry keeps the branding quiet and lets walks, people, maps, and lists carry the experience.</footer>
    </main>
  );
}
