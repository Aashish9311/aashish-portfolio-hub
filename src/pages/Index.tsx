
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Phone, Download, ExternalLink, ChevronDown, Menu, X, Sparkles, Code, Rocket, MapPin, Calendar, Award, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Handle active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "projects", "achievements", "certifications", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_name: 'Aashish Kumar Jha',
    };

    try {
      await emailjs.send(
        'service_1b4yz0r', // service ID
        'template_tr4rjj9', // template ID
        templateParams,
        'v8GKUFJN2iew3FPpp' // public key
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming resume is in the public folder
    link.download = 'Aashish_Kumar_Jha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume Download",
      description: "Resume download started. If it doesn't work, please contact me directly.",
    });
  };

  const technicalSkills = [
    "Python", "SQL", "Git & GitHub", "Docker (basic)", "AWS Cloud (basic)", "Linux (basic)", "Jenkins (basic)"
  ];

  const projects = [
    {
      title: "Metamask Integrated Decentralized Cloud Storage",
      description: "Developed a decentralized storage system enhancing data integrity and privacy using blockchain technology.",
      technologies: ["IPFS", "Ethereum", "Smart Contract", "Solidity", "Metamask", "HTML/CSS/JS"],
      link: "https://zingy-kelpie-b3afbd.netlify.app/"
    },
    {
      title: "CI/CD Pipeline for Automated Deployment",
      description: "Built a full CI/CD pipeline for automated deployment of a Django application with containerization.",
      technologies: ["Django", "Python", "Git", "Docker", "Jenkins", "EC2"],
      link: "https://github.com/Aashish9311/CI-CD-Pipeline-For-Automated-Deployment"
    },
    {
      title: "Virtual Mouse Using Hand Gestures",
      description: "Contactless interaction with computers through gesture detection using computer vision.",
      technologies: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
      link: "https://github.com/Aashish9311/Virtual_mouse"
    },
    {
      title: "Pharmacy Seller & Supplier System",
      description: "Streamlined communication and transactions between pharmacies and suppliers with a web application.",
      technologies: ["HTML", "CSS", "JS", "Bootstrap", "Flask", "SQLAlchemy"],
      link: "#"
    }
  ];

  const achievements = [
    {
      title: "First Rank in Progyan 7.0",
      description: "Awarded first rank in the in-house exhibition conducted by BIET CSE for the final year project: Metamask Integrated Decentralized Cloud Storage.",
      icon: Award
    },
    {
      title: "Published Paper",
      description: "Published a research paper on Metamask Integrated Decentralized Cloud Storage.",
      link: "https://philarchive.org/archive/AASRSS",
      icon: FileText
    }
  ];

  const certifications = [
    {
      title: "Participated In Establishing a CI/CD Pipeline for Automated Deployments (IBM CEP)",
      link: "https://qr.me-qr.com/mobile/pdf/425d2c92-13be-4d5f-b8ad-fb4cbf66b5a7"
    },
    {
      title: "Software Engineer Intern (HackerRank)",
      link: "https://www.hackerrank.com/certificates/49e6f015ce5d"
    },
    {
      title: "Python (HackerRank)",
      link: "https://www.hackerrank.com/certificates/d7140b19c439"
    },
    {
      title: "Problem Solving (HackerRank)",
      link: "https://www.hackerrank.com/certificates/e71388ddb248"
    },
    {
      title: "Technology Job Simulation",
      description: "Certificate of Completion – Aashish Kumar Jha, May 28th, 2025. Completed practical tasks in Coding and Development (March – May 2025)",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_XgXbpytRLdG5QBJKf_1748432564265_completion_certificate.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-portfolio-dark/90 backdrop-blur-md border-b border-portfolio-gray z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gradient">Aashish Kumar Jha</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Experience", "Skills", "Projects", "Achievements", "Certifications", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-portfolio-blue transition-colors ${
                    activeSection === item.toLowerCase() ? "text-portfolio-blue" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-portfolio-gray pt-4">
              {["Home", "About", "Experience", "Skills", "Projects", "Achievements", "Certifications", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 hover:text-portfolio-blue transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section - Adjusted positioning */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-portfolio-blue/5 via-transparent to-portfolio-teal/5"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-portfolio-blue rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-1 h-1 bg-portfolio-teal rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-portfolio-purple rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="text-center space-y-6 animate-fade-in">
              {/* Profile Image - Made Larger */}
              <div className="relative inline-block mb-6">
                <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-portfolio-blue via-portfolio-teal to-portfolio-purple p-1.5 animate-pulse">
                  <div className="w-full h-full rounded-full overflow-hidden bg-portfolio-gray">
                    <img 
                      src="https://i.ibb.co/ymPJ47wh/Portfolio-img.jpg"
                      alt="Aashish Kumar Jha"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-portfolio-gray/50 backdrop-blur-sm flex items-center justify-center"><span class="text-4xl font-bold text-white">AJ</span></div>';
                      }}
                    />
                  </div>
                </div>
                {/* Online status */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-portfolio-dark flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Greeting & Name */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm text-portfolio-teal mb-2">
                  <Sparkles size={16} />
                  <span className="tracking-wider uppercase">Available for Opportunities</span>
                  <Sparkles size={16} />
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-gradient bg-gradient-to-r from-white via-portfolio-blue to-portfolio-teal bg-clip-text text-transparent">
                    Aashish Kumar Jha
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="flex items-center gap-2 bg-portfolio-gray/50 backdrop-blur-sm px-4 py-2 rounded-full border border-portfolio-blue/20">
                    <Code size={16} className="text-portfolio-blue" />
                    <span className="text-sm">Software Developer</span>
                  </div>
                  <div className="flex items-center gap-2 bg-portfolio-gray/50 backdrop-blur-sm px-4 py-2 rounded-full border border-portfolio-teal/20">
                    <Rocket size={16} className="text-portfolio-teal" />
                    <span className="text-sm">DevOps Engineer</span>
                  </div>
                  <div className="flex items-center gap-2 bg-portfolio-gray/50 backdrop-blur-sm px-4 py-2 rounded-full border border-portfolio-purple/20">
                    <Award size={16} className="text-portfolio-purple" />
                    <span className="text-sm">AWS Cloud Practitioner</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-xl md:text-2xl mb-4 text-gray-300 font-light leading-relaxed">
                  Crafting innovative solutions through code and automation
                </p>
                <p className="text-lg mb-6 text-gray-400 leading-relaxed">
                  Aspiring Computer Science professional with a solid academic background and hands-on experience in software development, eager to apply technical skills and knowledge to real-world challenges.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="bg-gradient-to-r from-portfolio-blue to-portfolio-teal hover:shadow-xl hover:shadow-portfolio-blue/25 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6 rounded-xl"
                >
                  <ExternalLink className="mr-2" size={20} />
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="border-2 border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white transition-all duration-300 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                >
                  <Mail className="mr-2" size={20} />
                  Contact Me
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-portfolio-gray/30 backdrop-blur-sm rounded-xl border border-portfolio-blue/10">
                  <div className="text-2xl font-bold text-portfolio-blue">2025</div>
                  <div className="text-sm text-gray-400">Graduate</div>
                </div>
                <div className="text-center p-4 bg-portfolio-gray/30 backdrop-blur-sm rounded-xl border border-portfolio-teal/10">
                  <div className="text-2xl font-bold text-portfolio-teal">7+</div>
                  <div className="text-sm text-gray-400">Technologies</div>
                </div>
                <div className="text-center p-4 bg-portfolio-gray/30 backdrop-blur-sm rounded-xl border border-portfolio-purple/10">
                  <div className="text-2xl font-bold text-portfolio-purple">4+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <div className="text-xs text-gray-400 mb-2 tracking-wider">SCROLL DOWN</div>
            <div className="w-6 h-10 border-2 border-portfolio-blue rounded-full flex justify-center">
              <div className="w-1 h-3 bg-portfolio-blue rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-portfolio-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in">
                <p className="text-lg text-gray-300 mb-6">
                  Aspiring Computer Science professional with a solid academic background and hands-on experience in software development, eager to apply technical skills and knowledge to real-world challenges. Seeking an entry-level position to contribute to innovative projects and grow within a dynamic tech environment.
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-portfolio-blue">Education</h3>
                  <div className="border-l-2 border-portfolio-blue pl-4">
                    <h4 className="font-semibold">Bachelor of Engineering in Computer Science and Engineering</h4>
                    <p className="text-gray-400">Bapuji Institute of Engineering and Technology, Davanagere</p>
                    <p className="text-gray-500">Graduating 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-lg bg-gradient-to-br from-portfolio-blue/20 to-portfolio-teal/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-gray-600">AJ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Experience</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-portfolio-gray border-portfolio-blue/20 hover:border-portfolio-blue/50 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-portfolio-blue">AI DevOps Engineer</h3>
                    <p className="text-lg text-portfolio-teal">Rooman Technologies Pvt. Ltd.</p>
                  </div>
                  <p className="text-gray-400">09/2024 – 02/2025</p>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Completed AI DevOps training in association with NSDC, NASSCOM, Skill India, IBM</li>
                  <li>• Gained expertise in containerization, CI/CD pipelines</li>
                  <li>• Achieved NSQF Level 5 certification with 16 credits (Grade B)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-portfolio-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Skills</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-portfolio-blue mb-6">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {technicalSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-portfolio-teal mb-6">Soft Skills</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Problem Solving</span>
                    <div className="w-48 bg-portfolio-dark rounded-full h-2">
                      <div className="bg-gradient-to-r from-portfolio-blue to-portfolio-teal h-2 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Team Work</span>
                    <div className="w-48 bg-portfolio-dark rounded-full h-2">
                      <div className="bg-gradient-to-r from-portfolio-blue to-portfolio-teal h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Communication</span>
                    <div className="w-48 bg-portfolio-dark rounded-full h-2">
                      <div className="bg-gradient-to-r from-portfolio-blue to-portfolio-teal h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-portfolio-gray border-portfolio-blue/20 hover:border-portfolio-blue/50 transition-all hover:shadow-lg hover:shadow-portfolio-blue/10 group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-portfolio-blue group-hover:text-portfolio-teal transition-colors">
                      {project.title}
                    </h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-portfolio-blue transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-portfolio-dark text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-portfolio-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Achievements</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-portfolio-dark border-portfolio-blue/20 hover:border-portfolio-blue/50 transition-all hover:shadow-lg hover:shadow-portfolio-blue/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <achievement.icon className="w-8 h-8 text-portfolio-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-portfolio-blue mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{achievement.description}</p>
                      {achievement.link && (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-portfolio-teal hover:text-portfolio-blue transition-colors"
                        >
                          View Paper <ExternalLink size={16} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Certifications</h2>
          <div className="max-w-4xl mx-auto grid gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="bg-portfolio-gray border-portfolio-blue/20 hover:border-portfolio-blue/50 transition-all hover:shadow-lg hover:shadow-portfolio-blue/10"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-portfolio-blue mb-2">
                        {cert.title}
                      </h3>
                      {cert.description && (
                        <p className="text-gray-300 mb-4">{cert.description}</p>
                      )}
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 text-portfolio-teal hover:text-portfolio-blue transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-portfolio-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Contact Me</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-portfolio-blue" size={20} />
                  <span>jhaaashish23@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-portfolio-blue" size={20} />
                  <span>+91 9311231254</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="text-portfolio-blue" size={20} />
                  <a href="https://linkedin.com/in/aashish-kumar-jha" className="hover:text-portfolio-blue transition-colors">
                    linkedin.com/in/aashish-kumar-jha
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="text-portfolio-blue" size={20} />
                  <a href="https://github.com/Aashish9311" className="hover:text-portfolio-blue transition-colors">
                    github.com/Aashish9311
                  </a>
                </div>
              </div>
              <Button 
                onClick={handleResumeDownload}
                className="mt-6 bg-gradient-to-r from-portfolio-blue to-portfolio-teal hover:shadow-lg hover:shadow-portfolio-blue/25 transition-all"
              >
                <Download size={16} className="mr-2" />
                Download Resume
              </Button>
            </div>
            <div>
              <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-portfolio-dark border-portfolio-blue/30 focus:border-portfolio-blue"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-portfolio-dark border-portfolio-blue/30 focus:border-portfolio-blue"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="bg-portfolio-dark border-portfolio-blue/30 focus:border-portfolio-blue"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-portfolio-blue to-portfolio-teal hover:shadow-lg hover:shadow-portfolio-blue/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-portfolio-gray">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Aashish Kumar Jha. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
