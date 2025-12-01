import BaseLayout from '@/components/BaseLayout'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <BaseLayout>{children}</BaseLayout>
  )
}

export default Layout