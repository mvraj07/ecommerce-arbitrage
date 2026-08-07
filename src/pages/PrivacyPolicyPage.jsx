import React from 'react'
import PolicyLayout from '../components/PolicyLayout'

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>This Privacy Policy describes how Bebs collects, uses, and shares information about you when you use our services.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Information We Collect</h3>
      <p>We gather device data automatically, including browser info, IP address, and time zone. During purchases, we collect name, addresses, email, phone, and payment details. We do not store your credit card information.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Tracking Technologies</h3>
      <p>We use cookies, log files, web beacons, pixels, and embedded scripts for analytics, user authentication, and marketing personalization.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Third-Party Services</h3>
      <p>We work with Google Analytics and advertising partners. No personally identifiable information is used in interest-based advertising processes.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Data Sharing</h3>
      <p>Personal information may be shared with affiliated businesses and service providers, third parties for marketing (with prior consent), legal authorities when required, and buyers in business transfer scenarios.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Your Options</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Opt out of targeted ads via Facebook, Google, or Bing settings</li>
        <li>Unsubscribe from marketing emails at any time</li>
        <li>Request data correction or deletion via email</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Children</h3>
      <p>Children under 13 are not permitted to use and/or submit their personal information on our platform.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Contact</h3>
      <p>Email: <a href="mailto:support@bebs.com" className="underline">support@bebs.com</a></p>
    </PolicyLayout>
  )
}
