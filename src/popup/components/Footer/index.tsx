import React, { useEffect, useState } from 'react'

import { Container, BugReport, Version } from './styles'

export const Footer: React.FC = () => {
  const [version, setVersion] = useState('')

  useEffect(() => {
    const manifestData = chrome.runtime.getManifest()
    setVersion(manifestData.version)
  }, [])

  return (
    <Container>
      <BugReport>
        🐞
        <span>
          <a rel="noreferrer" target="_blank" href="https://github.com/corradopetrelli/vinted-enricher/issues">
            Report a bug
          </a>
        </span>
        🐞
      </BugReport>

      <Version>v{version}</Version>
    </Container>
  )
}
