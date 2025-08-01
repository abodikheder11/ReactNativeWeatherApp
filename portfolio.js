import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const projects = [
  {
    title: "Newsly",
    description:
      "A personalized news app that helps users stay updated with the latest news based on their interests.",
    features: [
      "Category-based news browsing",
      "Search functionality",
      "Firebase Authentication",
      "Profile screen with local image picker",
      "Bloc for state management",
      "Clean Architecture with dependency injection",
    ],
    tech: ["Flutter", "Dart", "Firebase Auth", "NewsAPI", "Bloc", "REST API"],
    link: "https://github.com/abodikheder11/newsApp",
  },
  {
    title: "SwiftCart",
    description:
      "A clean e-commerce app focused on fashion and lifestyle with scalable architecture and modern UI.",
    tech: ["Flutter", "Bloc", "Clean Architecture"],
  },
  {
    title: "SkyCast",
    description:
      "A charming weather app using location and WeatherAPI with dynamic UI.",
    tech: ["React Native", "Expo", "WeatherAPI", "React Navigation"],
    link: "https://github.com/abodikheder11/ReactNativeWeatherApp",
  },
  {
    title: "Mr. Taxi",
    description:
      "Ride-hailing app with real-time location tracking and route visualization.",
    tech: ["Flutter", "Firebase Auth", "Geolocator", "Google Maps", "Polyline"],
    link: "https://github.com/abodikheder11/mr.taxi",
  },
  {
    title: "Wave",
    description:
      "Real-time cross-platform chat app with Socket.io and JWT-based auth.",
    tech: ["Flutter", "Socket.io", "Bloc", "JWT"],
  },
];

export default function Portfolio() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Abdullah Kheder</h1>
        <p className="text-lg text-gray-600">Flutter Developer</p>
        <p className="mt-2 max-w-xl mx-auto">
          I'm a Flutter developer from Syria, currently based in Lebanon, with a
          strong passion for building mobile apps using Flutter and React
          Native. I love turning ideas into smooth, functional experiences
          through code.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/abodikheder11" target="_blank">
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/abdullah-kheder-8497822a6/"
            target="_blank"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((proj, idx) => (
            <Card key={idx} className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{proj.description}</p>
                {proj.features && (
                  <ul className="list-disc list-inside text-sm text-gray-600 mb-2">
                    {proj.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-gray-500 mb-2">
                  Tech: {proj.tech.join(", ")}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    className="text-blue-600 text-sm underline"
                  >
                    View on GitHub
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <p className="text-sm text-gray-700">
          Flutter, React Native, RESTful APIs, BLoC, Clean Architecture,
          Firebase, Google Cloud, Dependency Injection
        </p>
      </section>
    </main>
  );
}
