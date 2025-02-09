import { Shield, Code, FileSearch, BarChart3 } from "lucide-react"

const features = [
  {
    icon: <Shield className="w-12 h-12 text-blue-500" />,
    title: "Comprehensive Audits",
    description: "In-depth analysis of your smart contracts for vulnerabilities and best practices.",
  },
  {
    icon: <Code className="w-12 h-12 text-green-500" />,
    title: "Multiple Contract Support",
    description: "Audit and manage reports for multiple smart contracts.",
  },
  {
    icon: <FileSearch className="w-12 h-12 text-yellow-500" />,
    title: "Detailed Reporting",
    description: "Get comprehensive reports with severity levels and descriptions for each issue.",
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-red-500" />,
    title: "Code Statistics",
    description: "Gain insights into your code with detailed statistics and metrics.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

