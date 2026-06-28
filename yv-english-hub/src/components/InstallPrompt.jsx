import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show if user is likely on a mobile device (optional, but requested)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      if (isMobile) {
        setDeferredPrompt(e);
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    setShowBanner(false);
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 40px)',
      maxWidth: 400,
      background: 'rgba(20, 10, 50, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(138, 124, 255, 0.3)',
      borderRadius: 20,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      zIndex: 9999,
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.1)', borderRadius: 12, display: 'grid', placeItems: 'center', fontWeight: 'bold', color: '#fff' }}>YV</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>Baixar o App YV English</h4>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.8rem' }}>Instale para acessar mais rápido e offline.</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleDismiss} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Agora não</button>
        <button onClick={handleInstallClick} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', background: 'var(--purple)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Baixar App</button>
      </div>
    </div>
  );
}
