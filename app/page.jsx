export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-red-50 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Emergency Help, Instantly.
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
          Get AI-powered symptom checks & request ambulances in seconds.
        </p>
        <a
          href="/dashboard"
          className="bg-red-500 text-white px-6 py-3 rounded-full text-lg hover:bg-red-600"
        >
          Get Started
        </a>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">What You Can Do</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            title="AI Symptom Checker"
            desc="Describe how you feel. Get fast medical insights with AI."
          />
          <FeatureCard
            title="Request Ambulance"
            desc="Use geolocation to request nearby emergency help."
          />
          <FeatureCard
            title="Report History"
            desc="View and manage your past symptom analyses."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StepCard step="1" title="Describe Symptoms" />
          <StepCard step="2" title="Get AI Analysis" />
          <StepCard step="3" title="Request Emergency Help" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} EmergencyAI — All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function StepCard({ step, title }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm">
      <div className="text-red-500 text-3xl font-bold mb-2">{step}</div>
      <h4 className="text-xl font-medium">{title}</h4>
    </div>
  );
}
