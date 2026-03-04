import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import { auth } from '../../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(null); // 'client' or 'admin'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let user;
      if ((email === 'admin@gmail.com' && password === 'Immo#123') || 
          (email === 'client@gmail.com' && password === 'Immo#123')) {
        user = { 
          email, 
          role: email === 'admin@gmail.com' ? 'admin' : 'user',
          displayName: email === 'admin@gmail.com' ? 'Aubry Admin' : 'Client Test',
          uid: email === 'admin@gmail.com' ? 'admin-001' : 'client-001'
        };
        localStorage.setItem('mockUser', JSON.stringify(user));
        if (auth.dispatchAuthState) auth.dispatchAuthState(user);
      } else {
        const result = await auth.signInWithEmailAndPassword(email, password);
        user = result.user;
      }
      
      if (loginMode === 'admin') {
        if (user.role !== 'admin') {
          throw new Error("Cet espace est réservé aux administrateurs.");
        }
        setShowOtp(true);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === '2026') {
      navigate('/admin');
    } else {
      setError('Code OTP invalide.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-heading font-bold text-secondary-dark mb-6 text-center">
          {showOtp ? 'Double Authentification' : 'Connexion'}
        </h1>

        {error && <Alert type="error" className="mb-4">{error}</Alert>}

        {!showOtp ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Button 
                type="submit" 
                className="w-full" 
                isLoading={loading && loginMode === 'client'}
                onClick={() => setLoginMode('client')}
              >
                Connexion Client
              </Button>
              <Button 
                type="submit" 
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5" 
                isLoading={loading && loginMode === 'admin'}
                onClick={() => setLoginMode('admin')}
              >
                Connexion Admin
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-secondary text-center mb-4">
              Veuillez entrer le code de sécurité pour accéder à l'administration.
            </p>
            <div>
              <label className="block text-sm font-medium mb-1 text-center">Code OTP</label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="0000"
                className="text-center text-2xl tracking-widest"
                maxLength="4"
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">
              Vérifier le code
            </Button>
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full text-xs text-secondary hover:text-primary mt-2"
            >
              Retour à la connexion
            </button>
          </form>
        )}

        {!showOtp && (
          <p className="mt-6 text-center text-sm text-secondary">
            Pas encore de compte ? <Link to="/contact" className="text-primary font-medium">Contactez-nous</Link>
          </p>
        )}

        {/* Rappel pour le mode Mock */}
        
          <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
            <p><strong>Test Admin:</strong> admin@gmail.com / Immo#123 (OTP: 2026)</p>
            <p className="mt-1"><strong>Test Client:</strong> client@gmail.com / Immo#123</p>
          </div>
        
      </div>
    </div>
  );
};

export default Login;