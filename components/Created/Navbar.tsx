import React from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { ModeToggle } from "../ui/ModeToggle";
import LoginLogout from "./LoginLogout";
import Link from "next/link";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Create Complaint", href: "/create-complaint" },
    { name: "Track Complaints", href: "/track-complaints" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {
    return (
        <header className="bg-background border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link className="text-teal-600 dark:text-teal-300 font-bold text-lg" href="/">
                    MyLogo
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="flex gap-6">
                        {NAV_LINKS.map((item) => (
                            <NavigationMenuItem key={item.name}>
                                <NavigationMenuLink
                                    className="text-muted-foreground transition hover:text-foreground"
                                    href={item.href}
                                >
                                    {item.name}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        <ModeToggle />
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <div className="hidden sm:flex items-center gap-4">
                    <LoginLogout />
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <nav className="flex flex-col gap-4 mt-4">
                                {NAV_LINKS.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-foreground transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <hr className="my-2" />
                                <LoginLogout />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
