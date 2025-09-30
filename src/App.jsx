export default function App() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text)]">
      <ThemeStyles />
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Student–Professor Quiz App • Color System Demo</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Theme</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Palette Preview */}
      <section className="max-w-6xl mx-auto px-6">
        <Card title="Palette (from your Figma – dark w/ burnt‑orange accent)">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Swatch name="Accent 500" cssVar="--accent-500"/>
            <Swatch name="Accent 600" cssVar="--accent-600"/>
            <Swatch name="Accent 700" cssVar="--accent-700"/>
            <Swatch name="Surface" cssVar="--surface"/>
            <Swatch name="Bg" cssVar="--bg"/>
            <Swatch name="Text" cssVar="--text"/>
          </div>
        </Card>
      </section>

      {/* Components */}
      <section className="max-w-6xl mx-auto px-6 mt-6 grid lg:grid-cols-3 gap-6">
        <Card title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="surface">Surface</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </Card>
        <Card title="Inputs">
          <div className="grid gap-3">
            <Input label="Email" placeholder="student@oc.edu" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Select label="Course" options={["CS 4513", "CS 5733", "AI Capstone"]} />
          </div>
        </Card>
        <Card title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge>Live</Badge>
            <Badge tone="muted">Draft</Badge>
            <Badge tone="danger">Error</Badge>
            <Badge tone="success">Passed</Badge>
          </div>
        </Card>
      </section>

      {/* Screens */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Screens</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <Screen title="Student • Login">
            <div className="max-w-sm mx-auto">
              <Input label="Email" placeholder="sabrina@oc.edu" />
              <Input className="mt-3" label="Password" type="password" placeholder="••••••••" />
              <Button className="w-full mt-4">Log in</Button>
            </div>
          </Screen>

          <Screen title="Professor • My Courses">
            <div className="grid grid-cols-2 gap-4">
              <CourseCard title="AI Quiz Builder" code="CS 5733" />
              <CourseCard title="FlightPlan – T9" code="SE IV" />
            </div>
          </Screen>

          <Screen title="Professor • Create Quiz">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Input label="Quiz Title" placeholder="Midterm Check" />
                <Select label="Course" options={["AI Quiz Builder", "FlightPlan – T9"]} />
                <Input label="PIN" placeholder="1234" />
              </div>
              <div className="grid gap-3">
                <TextArea label="Question 1" placeholder="What is overfitting?" />
                <TextArea label="Question 2" placeholder="Define gradient descent." />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <Button variant="surface">Save Draft</Button>
                <Button>Publish</Button>
              </div>
            </div>
          </Screen>

          <Screen title="Live • Results (Student View)">
            <div className="grid gap-3 max-w-sm">
              <Stat k="Quiz" v="Midterm Check" />
              <Stat k="Score" v="87%" />
              <div className="rounded-2xl p-4 bg-[var(--surface)]/70 border border-[var(--stroke)]">
                <div className="text-sm opacity-80 mb-2">Question Summary</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <SummaryRow label="Q1" value="✔" />
                  <SummaryRow label="Q2" value="✖" />
                  <SummaryRow label="Q3" value="✔" />
                  <SummaryRow label="Q4" value="✔" />
                </div>
              </div>
            </div>
          </Screen>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 opacity-70 text-sm">
        <p>
          Tip: export this file into a Vite + React app and deploy to Vercel/Netlify for a shareable URL. The palette
          uses CSS variables so you can drop it into Vue easily.
        </p>
      </footer>
    </div>
  );
}

function ThemeToggle() {
  return (
    <div className="inline-flex rounded-full overflow-hidden border border-[var(--stroke)]">
      <button onClick={() => setTheme('dark')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Dark</button>
      <button onClick={() => setTheme('light')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">Light</button>
      <button onClick={() => setTheme('high')} className="px-3 py-1.5 text-sm hover:bg-[var(--surface)]">High‑Contrast</button>
    </div>
  );
}

function setTheme(mode) {
  const root = document.documentElement;
  const map = {
    dark: {
      '--bg': '#0b0b0c',
      '--surface': '#191919',
      '--stroke': '#2b2b2b',
      '--text': '#f5f5f3',
      '--muted': '#a6a6a6',
      '--accent-700': '#6b2d00',
      '--accent-600': '#8a3c00',
      '--accent-500': '#b45706',
      '--success': '#22c55e',
      '--danger': '#ef4444',
    },
    light: {
      '--bg': '#f7f7f7',
      '--surface': '#ffffff',
      '--stroke': '#e5e5e5',
      '--text': '#101010',
      '--muted': '#606060',
      '--accent-700': '#7a3704',
      '--accent-600': '#a14805',
      '--accent-500': '#cf640e',
      '--success': '#16a34a',
      '--danger': '#dc2626',
    },
    high: {
      '--bg': '#000000',
      '--surface': '#0f0f0f',
      '--stroke': '#3a3a3a',
      '--text': '#ffffff',
      '--muted': '#c7c7c7',
      '--accent-700': '#ff7a00',
      '--accent-600': '#ffa200',
      '--accent-500': '#ffd000',
      '--success': '#00ff66',
      '--danger': '#ff3355',
    },
  };
  Object.entries(map[mode]).forEach(([k, v]) => root.style.setProperty(k, v));
}

function ThemeStyles() {
  return (
    <style>{`
      :root {
        --bg:#0b0b0c; --surface:#191919; --stroke:#2b2b2b; --text:#f5f5f3; --muted:#a6a6a6;
        --accent-700:#6b2d00; --accent-600:#8a3c00; --accent-500:#b45706; --success:#22c55e; --danger:#ef4444;
      }
      .card { background: color-mix(in oklab, var(--surface) 92%, transparent); }
      .ring-accent { box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-500) 35%, transparent); }
    `}</style>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] card p-5">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-xl text-sm font-medium transition active:scale-[.98]';
  const styles = {
    primary: 'bg-[var(--accent-500)] text-black hover:bg-[var(--accent-600)]',
    surface: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--stroke)] hover:bg-[var(--surface)]/80',
    outline: 'border border-[var(--accent-500)] text-[var(--accent-500)] hover:bg-[var(--accent-500)] hover:text-black',
    ghost: 'text-[var(--text)] hover:bg-[var(--surface)]',
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>{children}</button>
  );
}

function Input({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm mb-1 opacity-80">{label}</div>
      <input {...props} className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)] focus:ring-accent" />
    </label>
  );
}

function TextArea({ label, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm mb-1 opacity-80">{label}</div>
      <textarea {...props} rows={3} className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)] focus:ring-accent" />
    </label>
  );
}

function Select({ label, options = [], className = '' }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm mb-1 opacity-80">{label}</div>
      <select className="w-full bg-[var(--surface)] border border-[var(--stroke)] rounded-xl px-3 py-2 outline-none focus:border-[var(--accent-500)]">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Badge({ children, tone = 'accent' }) {
  const map = {
    accent: 'bg-[var(--accent-500)] text-black',
    muted: 'bg-[var(--surface)] border border-[var(--stroke)] text-[var(--muted)]',
    danger: 'bg-[var(--danger)] text-white',
    success: 'bg-[var(--success)] text-black',
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${map[tone]}`}>{children}</span>;
}

function Swatch({ name, cssVar }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--stroke)]">
      <div className="h-16" style={{ background: `var(${cssVar})` }} />
      <div className="px-3 py-2 text-xs flex items-center justify-between">
        <span className="opacity-80">{name}</span>
        <code className="opacity-70">{cssVar}</code>
      </div>
    </div>
  );
}

function Screen({ title, children }) {
  return (
    <div className="rounded-3xl border border-[var(--stroke)] bg-[var(--bg)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm uppercase tracking-wider opacity-70">{title}</div>
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-500)]"/>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)]"/>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface)] border border-[var(--stroke)]"/>
        </div>
      </div>
      <div className="rounded-2xl bg-[var(--surface)]/60 border border-[var(--stroke)] p-5">
        {children}
      </div>
    </div>
  );
}

function CourseCard({ title, code }) {
  return (
    <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)]/60 p-4">
      <div className="text-sm opacity-70">{code}</div>
      <div className="text-base font-medium">{title}</div>
      <div className="mt-3 flex items-center justify-between">
        <Badge>Open</Badge>
        <Button variant="outline">Enter</Button>
      </div>
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[var(--surface)]/60 border border-[var(--stroke)] px-4 py-3">
      <div className="opacity-80">{k}</div>
      <div className="font-semibold">{v}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--surface)] border border-[var(--stroke)] px-3 py-2">
      <span className="opacity-80">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
