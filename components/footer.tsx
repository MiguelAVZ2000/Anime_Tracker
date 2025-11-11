import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Github, Mail, MessageCircle, FileText, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
          <div>
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Otakutrack
            </h3>
            <p className="text-sm text-muted-foreground">
              Tu plataforma definitiva para seguir y descubrir anime y manga con la comunidad otaku más grande.
            </p>
            <div className="flex gap-2 mt-4">
              <Link href="https://facebook.com" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ayuda y Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Enviar Feedback
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Registro de Cambios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-muted-foreground hover:text-foreground transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explorar Comunidad
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground hover:text-foreground transition-colors">
                  Foro
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Logros y Retos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API para Desarrolladores
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Otakutrack. Todos los derechos reservados.</p>
          <p className="mt-2">Hecho con ❤️ para la comunidad otaku mundial</p>
        </div>
      </div>
    </footer>
  )
}
