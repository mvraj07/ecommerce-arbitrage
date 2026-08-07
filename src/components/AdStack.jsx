import React from 'react'
import VignetteOverlay from './VignetteOverlay'
import PopunderOverlay from './PopunderOverlay'
import SocialBar from './SocialBar'

/**
 * AdStack — global mount point for the DEMO-ONLY floating/interceptor widgets.
 * Vignette + Popunder + SocialBar follow the user across navigation since they
 * are rendered once at the app root (in App.jsx).
 */
export default function AdStack() {
  return (
    <>
      <VignetteOverlay />
      <PopunderOverlay />
      <SocialBar />
    </>
  )
}
