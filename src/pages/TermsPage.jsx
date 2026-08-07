import React from 'react'
import PolicyLayout from '../components/PolicyLayout'

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service">
      <p>By visiting or purchasing from Bebs, you agree to all stated terms and conditions. These terms are governed by the laws of India.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Eligibility & Basic Rules</h3>
      <p>Users must be of legal majority age. Illegal use or transmitting malicious code is prohibited and will result in immediate service termination.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Pricing & Products</h3>
      <p>Prices for our products are subject to change without notice. Products may have limited quantities and are subject to our return policy.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Information Accuracy</h3>
      <p>We disclaim responsibility for inaccurate or outdated content. Users rely on site material at their own risk.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Third-Party Tools & Links</h3>
      <p>Third-party tools are provided "as is." Bebs bears no liability for third-party websites or transactions conducted there.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">User Submissions</h3>
      <p>Any comments or ideas submitted may be used by Bebs without obligation or compensation.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Limitation of Liability</h3>
      <p>Bebs is not liable for indirect, incidental, or consequential damages arising from the use of our services.</p>
      <h3 className="font-semibold text-gray-900 text-base mt-6">Contact</h3>
      <p>Email: <a href="mailto:support@bebs.com" className="underline">support@bebs.com</a><br />
      Phone: +91-7984158999<br />
      Address: 199, Kashi Textile Market, Ring Road, Surat, Gujarat-395002</p>
    </PolicyLayout>
  )
}
