import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Send, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react'

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1000))
      toast.success('Message sent! Ankit will get back to you soon.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section" ref={ref}
      style={{ background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, var(--red-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Let's Talk Sales Strategy</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            I'm Just One Message Away From <span>Helping You Grow</span>
          </h2>
          <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            Whether you're an individual looking to close bigger deals or a company wanting to uplevel your entire sales team — let's make it happen.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 2 }}>

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              padding: '40px 36px',
              display: 'flex', flexDirection: 'column', gap: 32,
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 8 }}>
                Get In Touch
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
                Ready to transform your sales game? Reach out directly or fill the form and Ankit will personally get back to you.
              </p>
            </div>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: MapPin, label: 'Location', value: 'Delhi, India',            href: null },
                { icon: Phone,  label: 'Phone',    value: '+91 97528 09028',          href: 'tel:+919752809028' },
                { icon: Mail,   label: 'Email',    value: 'ntswithankit@gmail.com',   href: 'mailto:ntswithankit@gmail.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href || '#'} style={{ display: 'flex', gap: 14, textDecoration: 'none' }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--red-dim)', border: '1px solid var(--border-red)',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}>
                    <Icon size={18} color="var(--red)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text)', fontWeight: 400 }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 14 }}>Follow Ankit</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: Linkedin,  href: 'https://www.linkedin.com/company/nail-thesale/',  label: 'LinkedIn' },
                  { icon: Instagram, href: 'https://www.instagram.com/nail_thesale/',         label: 'Instagram' },
                  { icon: Facebook,  href: 'https://www.facebook.com/people/Nail-the-Sale-with-Ankit/61576911484081/', label: 'Facebook' },
                  { icon: Youtube,   href: 'https://www.youtube.com/channel/UC5ArEQ8ZPw77_4oJ2HU13Zw', label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)',
                      clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--red-dim)'
                      e.currentTarget.style.borderColor = 'var(--border-red)'
                      e.currentTarget.style.color = 'var(--red)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--surface)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div style={{
              padding: '20px', marginTop: 'auto',
              background: 'var(--red-dim)',
              border: '1px solid var(--border-red)',
              borderLeft: '3px solid var(--red)',
            }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 300 }}>
                "Cracking the Code to Sales Psychology & High-Ticket Closures — Sell Smart • Close Big • Win Always"
              </p>
              <div style={{ marginTop: 8, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)' }}>
                — Ankit Khare
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              padding: '40px 36px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--text)', marginBottom: 8 }}>
              Send a Message
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300, marginBottom: 32 }}>
              Fill in your details and Ankit will personally respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your full name"
                    {...register('name', { required: 'Name is required' })} />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" placeholder="your@email.com" type="email"
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel"
                  {...register('phone')} />
              </div>

              <div className="form-group">
                <label className="form-label">I'm Interested In *</label>
                <select className="form-input"
                  {...register('interest', { required: 'Please select an option' })}
                  style={{ background: 'var(--surface)', color: 'var(--text)', borderColor: 'var(--border)' }}
                >
                  <option value="" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Select a service...</option>
                  <option value="1on1"      style={{ background: 'var(--bg)', color: 'var(--text)' }}>1-on-1 Sales Coaching</option>
                  <option value="corporate" style={{ background: 'var(--bg)', color: 'var(--text)' }}>Corporate Sales Training</option>
                  <option value="course"    style={{ background: 'var(--bg)', color: 'var(--text)' }}>Nail the Sale Course</option>
                  <option value="bootcamp"  style={{ background: 'var(--bg)', color: 'var(--text)' }}>High-Ticket Closing Bootcamp</option>
                  <option value="funnel"    style={{ background: 'var(--bg)', color: 'var(--text)' }}>Sales Funnel Diagnosis</option>
                  <option value="other"     style={{ background: 'var(--bg)', color: 'var(--text)' }}>Other / Not Sure</option>
                </select>
                {errors.interest && <span className="form-error">{errors.interest.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea className="form-input"
                  placeholder="Tell me about your sales challenges, your team size, your goals..."
                  {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please write at least 20 characters' } })}
                  style={{ minHeight: 120 }}
                />
                {errors.message && <span className="form-error">{errors.message.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary"
                disabled={isSubmitting}
                style={{ justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, width: '100%', padding: '16px 28px', fontSize: '1rem' }}
              >
                {isSubmitting ? 'Sending...' : <><Send size={16} /> Send Message</>}
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', fontWeight: 300 }}>
                By submitting, you agree to be contacted by Ankit Khare's team. No spam, ever.
              </p>
            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #contact .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}