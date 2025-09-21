import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from '../assets/icon.svg'

interface Link {
	label: string
	route: string
	type: "navigate" | "scroll"
}

const landingLinks: Link[] = [
	{ label: "Características", route: "features", type: "scroll" },
]

const genericLinks: Link[] = [
	{ label: "Inicio", route: "/", type: "navigate" },
	{ label: "Analizar", route: "/analyze", type: "navigate"},
	{ label: "Acerca de", route: "/about", type: "navigate" },
]

export function NavBar({ isLanding = false }: { isLanding?: boolean }) {
	const navigate = useNavigate()
	const location = useLocation()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const links: Link[] = isLanding ? landingLinks.concat(genericLinks) : genericLinks

	const handleLinkClick = (link: Link) => {
		if (link.type === "scroll") {
			document.getElementById(link.route)?.scrollIntoView({ behavior: "smooth" })
		} else {
			navigate(link.route)
		}
		setIsMobileMenuOpen(false)
	}

	const isCurrentPage = (route: string) => {
		return location.pathname === route
	}

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<img src={logo} />
					</div>
					<span className="text-xl font-bold text-foreground">DataAnalyzer</span>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					{links.map((link, index) => (
						<button
							key={index}
							onClick={() => handleLinkClick(link)}
							className={`text-sm font-medium transition-colors cursor-pointer ${
								isCurrentPage(link.route)
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{link.label}
						</button>
					))}
				</nav>

				{/* Desktop CTA Button */}
				<div className="hidden md:flex items-center gap-4">
					<Button className="bg-primary hover:bg-primary/90">Comenzar</Button>
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden flex items-center gap-2">
					<DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="h-9 w-9 p-0">
								{isMobileMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
								<span className="sr-only">Abrir menú</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							{links.map((link, index) => (
								<DropdownMenuItem
									key={index}
									onClick={() => handleLinkClick(link)}
									className={`cursor-pointer ${
										isCurrentPage(link.route) ? "bg-accent" : ""
									}`}
								>
									{link.label}
								</DropdownMenuItem>
							))}
							<div className="border-t pt-2 mt-2">
								<DropdownMenuItem className="cursor-pointer">
									<Button className="w-full bg-primary hover:bg-primary/90">
										Comenzar
									</Button>
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
