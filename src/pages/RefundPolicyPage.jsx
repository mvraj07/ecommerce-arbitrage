import React from 'react'
import PolicyLayout from '../components/PolicyLayout'

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy">
      <p>We want you to be completely satisfied with your purchase. Please read our refund and return policy carefully.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Important Requirement</h3>
      <p className="font-medium text-red-700">Customers must record a parcel opening video upon delivery. Without it, returns cannot be processed.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Refunds</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Returned to the original payment method (card, net banking, or bank account for COD)</li>
        <li>Typically take 5–6 business days to reflect</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Returns</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Accepted within 30 days of delivery for damaged, defective, or incorrect items</li>
        <li>Items must be unused, in original packaging with tags and invoice</li>
        <li>Products damaged while being used do not qualify for a refund or replacement</li>
        <li>Return courier reimbursed up to ₹120 with receipt</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Timeline</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Full return process: approximately 6–8 business days</li>
        <li>Reverse pickup: 3–6 business days from request date</li>
      </ul>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Cancellations</h3>
      <p>Contact us via phone or email. Confirmation sent to registered mobile/email. Orders already shipped cannot be cancelled.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Contact</h3>
      <p>
        Email: <a href="mailto:support@bebs.com" className="underline">support@bebs.com</a><br />
        Phone: +91-7984158999<br />
        Address: Shop No. 199, Kashi Textile Market, Ring Road, Surat, Gujarat-395002
      </p>
    </PolicyLayout>
  )
}
