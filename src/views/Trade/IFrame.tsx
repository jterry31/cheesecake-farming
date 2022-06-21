import React, { useContext, useRef } from 'react'
import useWindowDimensions from 'hooks/useWindowDimension'
import IframeResizer from 'iframe-resizer-react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { LanguageContext } from '../../contexts/Localisation/languageContext'

interface IFrameProps {
  url: string
  title: string
}

const IFrame: React.FC<IFrameProps> = (props) => {
  const { url, title } = props
  const iframeRef = useRef(null);
  const { isDark } = useContext(ThemeContext);
  const { selectedLanguage } = useContext(LanguageContext)
  const { height } = useWindowDimensions()
  const sendSettings = e =>{
    const payload = {
      isDark,
      selectedLanguage
    }
    iframeRef.current.sendMessage(payload)
  };
  return (
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="max"
        title={title}
        minHeight={height - 64}
        src={url}
        scrolling="omit"
        onLoad={sendSettings}
        style={{ width: '1px', minWidth: '100%'}}
      />
  )
}

export default IFrame