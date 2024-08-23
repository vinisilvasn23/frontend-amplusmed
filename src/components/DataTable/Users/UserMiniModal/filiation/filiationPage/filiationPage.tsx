'use client'

import * as React from 'react'
import Assigner from './assigner'
import { FiliationTable } from '../table/table'

export default function FiliationForm() {
  return (
    <div className="">
      <Assigner />
      <FiliationTable />
    </div>
  )
}
