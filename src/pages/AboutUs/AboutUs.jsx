import { CheckCircle, Zap, Package, Shield, TrendingUp } from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Quick booking and pickup scheduling for your urgent deliveries",
    },
    {
      icon: Package,
      title: "Seamless Tracking",
      description: "Real-time tracking and updates for complete visibility",
    },
    {
      icon: Shield,
      title: "Secure Delivery",
      description:
        "Digital proof of delivery ensuring transparency and accountability",
    },
    {
      icon: TrendingUp,
      title: "Business Focused",
      description:
        "Designed specifically for businesses to simplify logistics operations",
    },
  ];

  const benefits = [
    "Streamlined booking and tracking processes",
    "Real-time delivery updates and notifications",
    "Digital proof of delivery",
    "Enhanced operational efficiency",
    "Improved customer satisfaction",
    "Cost-effective logistics solutions",
  ];

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl overflow-hidden">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-lime-50 to-lime-100 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-teal-900 mb-6">
            About DoorKnock
          </h1>
          <p className="text-xl text-teal-800 max-w-2xl">
            Revolutionizing parcel delivery with fast, reliable, and transparent
            logistics solutions for modern businesses.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* What We Do Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-teal-900 mb-8">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                DoorKnock is a comprehensive home and office pickup parcel
                delivery system that transforms how businesses handle logistics.
                We streamline every aspect of the delivery process—from initial
                booking through final delivery.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our platform combines cutting-edge technology with user-friendly
                design to ensure your parcels arrive on time, every time.
                Whether you're a small business or a large enterprise, DoorKnock
                adapts to your delivery needs.
              </p>
              <div className="space-y-3">
                {benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-lime-500 shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-linear-to-br from-lime-400 to-lime-300 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <Package className="w-32 h-32 text-lime-900 mx-auto mb-4 opacity-80" />
                <p className="text-lime-900 font-semibold text-lg">
                  Fast & Reliable Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-teal-900 mb-12">
            Why Choose DoorKnock
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-lime-500 mb-4" />
                  <h3 className="text-xl font-bold text-teal-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-linear-to-r from-teal-900 to-teal-800 text-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed max-w-3xl">
            To empower businesses with intelligent, efficient, and transparent
            delivery solutions that eliminate logistics complexity, reduce
            costs, and enhance customer satisfaction. We believe every parcel
            deserves to be delivered with precision and care.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-teal-900 mb-12">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-white p-6 rounded-lg border border-gray-200"
              >
                <CheckCircle className="w-6 h-6 text-lime-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-lime-50 border-2 border-lime-200 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-teal-900 mb-4">
            Ready to Transform Your Delivery Operations?
          </h2>
          <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of businesses that trust DoorKnock for fast,
            reliable, and transparent parcel delivery.
          </p>
          <button className="bg-lime-500 hover:bg-lime-600 text-teal-900 font-bold py-3 px-8 rounded-lg transition-colors">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-teal-900 text-white py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-lime-400 mb-2">Fast</p>
              <p className="text-gray-300">Quick pickup and delivery</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-lime-400 mb-2">Reliable</p>
              <p className="text-gray-300">Transparent tracking & delivery</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-lime-400 mb-2">Efficient</p>
              <p className="text-gray-300">
                Streamlined logistics for businesses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
