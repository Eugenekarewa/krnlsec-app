"use client"

import React, { useEffect, useState } from "react"

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <React.Fragment {...delegated}>{children}</React.Fragment>
}

