import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, LogOut, Save, Edit, Building2, Globe, Star, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WorkerFields = ({ form, handleChange }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="text-xs text-muted-foreground">Nombre completo</Label>
        <Input value={form.full_name || ''} onChange={e => handleChange('full_name', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">DNI</Label>
        <Input value={form.dni || ''} onChange={e => handleChange('dni', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Teléfono</Label>
        <Input value={form.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Fecha de nacimiento</Label>
        <Input type="date" value={form.birth_date || ''} onChange={e => handleChange('birth_date', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Género</Label>
        <Select value={form.sex || ''} onValueChange={v => handleChange('sex', v)}>
          <SelectTrigger className="rounded-xl mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
          <SelectContent>
            {["Masculino", "Femenino", "Otro"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Distrito</Label>
        <Input value={form.district || ''} onChange={e => handleChange('district', e.target.value)} placeholder="Ej: Comas" className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Provincia</Label>
        <Input value={form.province || ''} onChange={e => handleChange('province', e.target.value)} placeholder="Ej: Lima" className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Departamento</Label>
        <Input value={form.department || ''} onChange={e => handleChange('department', e.target.value)} placeholder="Ej: Lima" className="rounded-xl mt-1" />
      </div>
    </div>

    <hr className="border-border" />
    <h3 className="font-heading font-semibold text-foreground text-sm">Información profesional</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="text-xs text-muted-foreground">Ocupación</Label>
        <Input value={form.occupation || ''} onChange={e => handleChange('occupation', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Profesión</Label>
        <Input value={form.profession || ''} onChange={e => handleChange('profession', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Nivel educativo</Label>
        <Select value={form.education_level || ''} onValueChange={v => handleChange('education_level', v)}>
          <SelectTrigger className="rounded-xl mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
          <SelectContent>
            {["Primaria", "Secundaria", "Técnico", "Universitario", "Postgrado"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Años de experiencia</Label>
        <Input type="number" value={form.experience_years || ''} onChange={e => handleChange('experience_years', Number(e.target.value))} className="rounded-xl mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs text-muted-foreground">Habilidades</Label>
        <Input value={form.skills || ''} onChange={e => handleChange('skills', e.target.value)} placeholder="Ej: Excel, Ventas, Albañilería..." className="rounded-xl mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs text-muted-foreground">Idiomas</Label>
        <Input value={form.languages || ''} onChange={e => handleChange('languages', e.target.value)} placeholder="Ej: Español, Inglés básico..." className="rounded-xl mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs text-muted-foreground">Acerca de mí</Label>
        <Textarea value={form.bio || ''} onChange={e => handleChange('bio', e.target.value)} placeholder="Cuéntanos sobre ti..." className="rounded-xl mt-1" rows={3} />
      </div>
    </div>
  </div>
);

const CompanyFields = ({ form, handleChange }) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="text-xs text-muted-foreground">Nombre de la empresa</Label>
        <Input value={form.company_name || ''} onChange={e => handleChange('company_name', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Razón social</Label>
        <Input value={form.company_legal_name || ''} onChange={e => handleChange('company_legal_name', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">RUC</Label>
        <Input value={form.ruc || ''} onChange={e => handleChange('ruc', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Sector</Label>
        <Input value={form.sector || ''} onChange={e => handleChange('sector', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Tamaño de empresa</Label>
        <Select value={form.company_size || ''} onValueChange={v => handleChange('company_size', v)}>
          <SelectTrigger className="rounded-xl mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
          <SelectContent>
            {["1-10", "11-50", "51-200", "200+"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Teléfono</Label>
        <Input value={form.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs text-muted-foreground">Dirección</Label>
        <Input value={form.company_address || ''} onChange={e => handleChange('company_address', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Sitio web</Label>
        <Input value={form.company_website || ''} onChange={e => handleChange('company_website', e.target.value)} placeholder="https://..." className="rounded-xl mt-1" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Persona de contacto</Label>
        <Input value={form.contact_person || ''} onChange={e => handleChange('contact_person', e.target.value)} className="rounded-xl mt-1" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs text-muted-foreground">Descripción de la empresa</Label>
        <Textarea value={form.company_description || ''} onChange={e => handleChange('company_description', e.target.value)} placeholder="Describe tu empresa..." className="rounded-xl mt-1" rows={3} />
      </div>
    </div>
  </div>
);

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [profiles, apps] = await Promise.all([
        base44.entities.UserProfile.filter({ created_by_id: user?.id }),
        base44.entities.JobApplication.list('-created_date', 100),
      ]);
      setApplications(apps);
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        setForm(profiles[0]);
      } else {
        setForm({ user_type: 'worker', full_name: user?.full_name || '' });
      }
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    if (profile) {
      await base44.entities.UserProfile.update(profile.id, form);
      setProfile({ ...profile, ...form });
    } else {
      const created = await base44.entities.UserProfile.create(form);
      setProfile(created);
    }
    setEditing(false);
    setSaving(false);
    toast({ title: '✅ Perfil actualizado', description: 'Tus datos se guardaron correctamente.' });
  };

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const isCompany = form.user_type === 'company';
  const displayName = isCompany ? (profile?.company_name || user?.full_name || 'Empresa') : (user?.full_name || 'Usuario');
  const approvedCount = applications.filter(a => a.status === 'Aprobado').length;

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="px-4 lg:px-8 py-6 max-w-3xl mx-auto">

      {/* Profile header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-5 text-white relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary font-heading font-bold text-2xl flex-shrink-0 shadow-lg">
            {displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-lg font-bold text-white truncate">{displayName}</h1>
            <p className="text-white/70 text-sm flex items-center gap-1 truncate"><Mail className="w-3.5 h-3.5" />{user?.email}</p>
            {profile?.occupation && <p className="text-white/60 text-xs mt-0.5">{profile.occupation}</p>}
            {profile?.district && <p className="text-white/60 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{profile.district}</p>}
          </div>
          <button onClick={() => setEditing(!editing)}
            className="bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 flex-shrink-0">
            <Edit className="w-3.5 h-3.5" /> {editing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="font-heading font-bold text-xl">{applications.length}</p>
            <p className="text-white/70 text-[10px]">Postulaciones</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="font-heading font-bold text-xl">{approvedCount}</p>
            <p className="text-white/70 text-[10px]">Aprobados</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="font-heading font-bold text-xl">{isCompany ? '🏢' : '👤'}</p>
            <p className="text-white/70 text-[10px]">{isCompany ? 'Empresa' : 'Trabajador'}</p>
          </div>
        </div>
      </div>

      {/* User type selector (if no profile yet) */}
      {!profile && !editing && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-5">
          <h2 className="font-heading font-semibold text-foreground mb-3">¿Eres trabajador o empresa?</h2>
          <div className="flex gap-3">
            <button onClick={() => { setForm(f => ({ ...f, user_type: 'worker' })); setEditing(true); }}
              className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl p-4 font-heading font-semibold text-sm transition-colors flex flex-col items-center gap-2">
              <User className="w-6 h-6" /> Trabajador
            </button>
            <button onClick={() => { setForm(f => ({ ...f, user_type: 'company' })); setEditing(true); }}
              className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl p-4 font-heading font-semibold text-sm transition-colors flex flex-col items-center gap-2">
              <Building2 className="w-6 h-6" /> Empresa
            </button>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-foreground">Editar perfil</h2>
            <div className="flex gap-2">
              <button onClick={() => handleChange('user_type', 'worker')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${form.user_type === 'worker' ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                <User className="w-3 h-3 inline mr-1" /> Trabajador
              </button>
              <button onClick={() => handleChange('user_type', 'company')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${form.user_type === 'company' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                <Building2 className="w-3 h-3 inline mr-1" /> Empresa
              </button>
            </div>
          </div>

          {isCompany
            ? <CompanyFields form={form} handleChange={handleChange} />
            : <WorkerFields form={form} handleChange={handleChange} />
          }

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave} disabled={saving} className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-heading font-semibold gap-2 h-11">
              <Save className="w-4 h-4" /> {saving ? 'Guardando...' : 'Guardar perfil'}
            </Button>
            <Button variant="outline" onClick={() => setEditing(false)} className="rounded-xl font-heading font-semibold h-11">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Display info when not editing */}
      {!editing && profile && (
        <div className="bg-card rounded-2xl border border-border p-6 mb-5 space-y-3">
          <h2 className="font-heading font-bold text-foreground mb-4">Mi información</h2>
          {!isCompany ? (
            <div className="space-y-2.5">
              {profile.occupation && <div className="flex items-center gap-2.5 text-sm"><Briefcase className="w-4 h-4 text-accent" /><span className="text-foreground">{profile.occupation}</span></div>}
              {profile.education_level && <div className="flex items-center gap-2.5 text-sm"><GraduationCap className="w-4 h-4 text-success" /><span className="text-foreground">{profile.education_level}</span></div>}
              {profile.experience_years && <div className="flex items-center gap-2.5 text-sm"><Calendar className="w-4 h-4 text-secondary" /><span className="text-foreground">{profile.experience_years} años de experiencia</span></div>}
              {profile.district && <div className="flex items-center gap-2.5 text-sm"><MapPin className="w-4 h-4 text-chart-4" /><span className="text-foreground">{[profile.district, profile.province, profile.department].filter(Boolean).join(', ')}</span></div>}
              {profile.phone && <div className="flex items-center gap-2.5 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /><span className="text-foreground">{profile.phone}</span></div>}
              {profile.skills && <div className="flex items-start gap-2.5 text-sm"><Star className="w-4 h-4 text-warning mt-0.5" /><span className="text-foreground">{profile.skills}</span></div>}
              {profile.languages && <div className="flex items-center gap-2.5 text-sm"><Globe className="w-4 h-4 text-chart-2" /><span className="text-foreground">{profile.languages}</span></div>}
              {profile.bio && <div className="mt-3 pt-3 border-t border-border"><p className="text-muted-foreground text-sm">{profile.bio}</p></div>}
            </div>
          ) : (
            <div className="space-y-2.5">
              {profile.company_name && <div className="flex items-center gap-2.5 text-sm"><Building2 className="w-4 h-4 text-primary" /><span className="text-foreground">{profile.company_name}</span></div>}
              {profile.ruc && <div className="flex items-center gap-2.5 text-sm"><FileText className="w-4 h-4 text-muted-foreground" /><span className="text-foreground">RUC: {profile.ruc}</span></div>}
              {profile.sector && <div className="flex items-center gap-2.5 text-sm"><Briefcase className="w-4 h-4 text-accent" /><span className="text-foreground">{profile.sector}</span></div>}
              {profile.company_address && <div className="flex items-center gap-2.5 text-sm"><MapPin className="w-4 h-4 text-chart-4" /><span className="text-foreground">{profile.company_address}</span></div>}
              {profile.company_website && <div className="flex items-center gap-2.5 text-sm"><Globe className="w-4 h-4 text-chart-2" /><a href={profile.company_website} target="_blank" rel="noreferrer" className="text-accent hover:underline">{profile.company_website}</a></div>}
              {profile.company_description && <div className="mt-3 pt-3 border-t border-border"><p className="text-muted-foreground text-sm">{profile.company_description}</p></div>}
            </div>
          )}
        </div>
      )}

      <Button variant="outline" onClick={() => base44.auth.logout('/welcome')}
        className="w-full rounded-xl text-destructive border-destructive/20 hover:bg-destructive/5 font-heading font-semibold gap-2 h-11">
        <LogOut className="w-4 h-4" /> Cerrar sesión
      </Button>
    </div>
  );
}