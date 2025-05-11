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

const Navbar = () => {
    return (
        <header className="bg-background border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <a className="text-teal-600 dark:text-teal-300 font-bold text-lg" href="#">
                    {/* You can replace this with an Image or SVG icon */}
                    MyLogo
                </a>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="flex gap-6">
                        {["About", "Careers", "History", "Services", "Projects", "Blog"].map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink
                                    className="text-muted-foreground transition hover:text-foreground"
                                    href="#"
                                >
                                    {item}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        <ModeToggle />
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <div className="hidden sm:flex items-center gap-4">
                    <Button variant="default" className=" text-black ">
                        Login
                    </Button>
                    <Button variant="secondary">Register</Button>
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
                                {["About", "Careers", "History", "Services", "Projects", "Blog"].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="text-muted-foreground hover:text-foreground transition"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <hr className="my-2" />
                                <Button variant="default" className="w-full  ">
                                    Login
                                </Button>
                                <Button variant="secondary" className="w-full">
                                    Register
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
