import React from 'react'
import IframeResizer from 'iframe-resizer-react'

const Stats = () => {
  return (
    <IframeResizer
      src="https://metabase.traitdunion.beta.gouv.fr/public/dashboard/804877c6-a815-4061-8858-feffda560130"
      style={{ height: '1700px', minHeight: '100%', width: '1px', minWidth: '100%' }}
    />
  )
}

export default Stats
