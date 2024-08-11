import ClientComponent from '../components/ClientComponent'
import FindFreeClass from '../components/FindFreeClass'
import InputFreeClass from '../components/InputFreeClass'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-900">Free Class Finder</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClientComponent>
            <FindFreeClass />
          </ClientComponent>
          <ClientComponent>
            <InputFreeClass />
          </ClientComponent>
        </div>
      </div>
    </main>
  )
}