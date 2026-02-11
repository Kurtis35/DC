import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { api } from "@shared/routes";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  Zap, 
  Wrench, 
  DoorOpen, 
  Video, 
  Phone, 
  MapPin, 
  Star,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutation.mutate(data);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            D&C Motor It
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Services</a>
            <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">About</a>
            <a href="#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]">
              069 283 4876
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Smart Gate Automation.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Total Control.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto">
              24/7 Professional Gate & Access Solutions in Cape Town
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-white text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.4)]">
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-cyan-400 hover:bg-slate-800 text-lg px-8 py-6 rounded-full">
                Call 069 283 4876
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute left-10 bottom-32 hidden lg:block"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">
              <Star className="w-6 h-6 fill-cyan-400" />
            </div>
            <div>
              <div className="font-bold">5.0 Rating</div>
              <div className="text-xs text-slate-400">Based on 20+ reviews</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute right-10 top-32 hidden lg:block"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold">24/7 Service</div>
              <div className="text-xs text-slate-400">Emergency Callouts</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Star, text: "5.0 Rated Service" },
              { icon: Clock, text: "24/7 Emergency" },
              { icon: Zap, text: "Fast Response" },
              { icon: ShieldCheck, text: "Certified Techs" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 justify-center text-slate-300">
                <item.icon className="w-6 h-6 text-cyan-400" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Premium <span className="text-cyan-400">Services</span>
          </motion.h2>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Wrench, title: "Gate Motor Installation", desc: "Expert installation of Centurion and ET systems for maximum reliability." },
              { icon: Zap, title: "Gate Motor Repairs", desc: "Fast troubleshooting and repairs for all major gate motor brands." },
              { icon: Phone, title: "Intercom Systems", desc: "Crystal clear audio and video intercom solutions for your property." },
              { icon: DoorOpen, title: "Access Control", desc: "Keypads, tag readers, and biometric systems for secure entry." },
              { icon: Video, title: "Sliding & Swing Gates", desc: "Complete automation solutions for any gate type or configuration." },
              { icon: Clock, title: "Emergency Callouts", desc: "24/7 rapid response for stuck gates and security emergencies." }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl -z-10 rounded-full"></div>
              <div className="bg-slate-800 rounded-2xl aspect-square overflow-hidden border border-slate-700 relative">
                 {/* Placeholder for image */}
                 <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    <ShieldCheck className="w-24 h-24 opacity-20" />
                 </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Excellence in Every <span className="text-cyan-400">Detail</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                At D&C Motor It, we don't just fix gates; we provide peace of mind. With years of experience in the Cape Town area, our certified technicians deliver high-precision automation solutions that combine security with convenience.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">100+</div>
                  <div className="text-slate-400">Installations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                  <div className="text-slate-400">Support</div>
                </div>
              </div>
              
              <ul className="space-y-4">
                {["Professional & Reliable", "Fully Accredited Team", "Premium Parts Warranty"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Need Urgent Gate Repairs?</h2>
          <p className="text-xl text-slate-300 mb-12">Don't compromise your security. Our team is ready to help 24/7.</p>
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-white text-xl px-12 py-8 rounded-full shadow-[0_0_40px_rgba(6,182,212,0.5)] animate-pulse">
            069 283 4876
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-6">D&C Motor It</div>
              <p className="text-slate-500">Premium gate automation and security solutions for modern homes and businesses.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <div className="space-y-4 text-slate-400">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  <span>27 Gardiner Rd, Parow, Cape Town, 7400</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-500" />
                  <span>069 283 4876</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-500" />
                  <span>Open 24 Hours</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Service Areas</h4>
              <div className="flex flex-wrap gap-2">
                {["Parow", "Bellville", "Goodwood", "Cape Town", "Durbanville"].map((area) => (
                  <span key={area} className="bg-slate-900 px-3 py-1 rounded-full text-sm text-slate-400 border border-slate-800">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center text-slate-600 text-sm border-t border-slate-900 pt-8">
            © {new Date().getFullYear()} D&C Motor It. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
