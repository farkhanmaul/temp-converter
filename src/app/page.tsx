import TemperatureConverter from '@/components/TemperatureConverter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto">
        <TemperatureConverter />
      </div>
    </div>
  );
}
