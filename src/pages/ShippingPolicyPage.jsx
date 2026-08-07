import React from 'react'
import PolicyLayout from '../components/PolicyLayout'

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy">
      <p>We deliver to all postal addresses across India. P.O. Box deliveries are not supported. A full street address with PIN code is required.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Delivery Timeframe</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Orders processed within 48–72 hours of placement</li>
        <li>Expected delivery: 7–9 business days after ordering</li>
        <li>All orders are shipped by 1st Class Air Courier or Surface Services</li>
        <li>Home delivered within approximately 5–7 working days after dispatch</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Key Policies</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Multiple items may arrive in separate boxes on different days</li>
        <li>Transit insurance is included at no extra cost</li>
        <li>Tracking info is emailed once dispatched; tracking numbers may take 24–48 hours to activate</li>
        <li>Address changes must be requested within 24 hours via email</li>
        <li>Incorrect address penalty fees are the customer's responsibility</li>
        <li>Lost shipments: a 15-day waiting period occurs before reshipping</li>
        <li>No Sunday or public holiday shipments</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Packaging</h3>
      <p>Items are bubble-wrapped, then placed in corrugated boxes for safe delivery.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Contact</h3>
      <p>Email: <a href="mailto:support@bebs.com" className="underline">support@bebs.com</a></p>
    </PolicyLayout>
  )
}
