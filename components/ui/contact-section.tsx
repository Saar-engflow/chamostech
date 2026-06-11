"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: dbError } = await supabase
        .from('client_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          message: formData.message,
        });

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ name: '', email: '', organization: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-blue/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-sm font-bold tracking-wider text-primary-blue uppercase">Contact</h2>
          <h3 className="text-5xl font-bold tracking-tighter text-text-dark sm:text-6xl">
            Get In Touch
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact Information Column */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-500/5 h-full">
            <h4 className="text-2xl font-bold text-text-dark mb-8">Contact Information</h4>
            
            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg mb-1">Email</p>
                  <a href="mailto:chamosdistributionltd@gmail.com" className="text-gray-600 hover:text-primary-blue transition-colors">
                    chamosdistributionltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg mb-1">Phone</p>
                  <div className="flex flex-col gap-1 text-gray-600">
                    <a href="tel:0766562299" className="hover:text-primary-blue transition-colors">0766562299</a>
                    <a href="tel:0974401570" className="hover:text-primary-blue transition-colors">0974401570</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg mb-1">WhatsApp</p>
                  <a href="https://wa.me/260766562299" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
                    +260 766562299
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg mb-1">Office</p>
                  <p className="text-gray-600">
                    Lusaka, Zambia
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary-blue">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg mb-1">Business Hours</p>
                  <p className="text-gray-600">
                    Mon - Fri: 08:00 - 17:00<br />
                    Sat - Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-500/5">
            <h4 className="text-2xl font-bold text-text-dark mb-8">Send us a message</h4>
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-text-dark">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-text-dark">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="text-sm font-bold text-text-dark">Organization</label>
                <input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Your Organization"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-text-dark">Message *</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or how we can help..."
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all resize-none"
                  required
                  disabled={loading}
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
