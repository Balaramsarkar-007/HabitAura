import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Footer from '@/componnets/layouts/Footer';
import Header from '@/componnets/layouts/Header';

export default function LandingPageLayout({children}: {children: React.ReactNode}) {
    return (
      <>
        <Header />
          {children}
        <Footer />
      </>
    )
  }
