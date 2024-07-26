import { useEffect } from 'react';

const KoynScript = (url) => {
  /* useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.type = "text/javascript3232132"
    script.async = true;
    script.setAttribute("org_id", process.env.REACT_APP_ORG_ID);
    script.id = "deviceId_fp";

    document.body.appendChild(script);
    // setTimeout(() => {
    //   if(!!window.getSessionID){
    //     window.getSessionID(function (sessionId) {
    //     // Capture sessionId to later send in API calls
    //       window.koinSessionId = sessionId;
    //       return sessionId;
    //     })
    //   }
      
    // }, 1000);
    
    
    return () => {
      document.body.removeChild(script);
      
    }
  }, [url]); */

  return true;
};

/* const GetKoinSessionID = () => {
  
} */

export default KoynScript;
