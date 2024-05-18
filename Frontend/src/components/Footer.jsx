import {
    AtSignIcon,
    EarthIcon,
    FacebookIcon,
    HeadsetIcon,
    LinkedinIcon,
    TwitterIcon,
} from 'lucide-react';

const socialLinks = [
    {
        name: 'LinkedIn',
        link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.linkedin.com/company/nasa&ved=2ahUKEwjewvHIt5aGAxVZrlYBHdgJD9YQFnoECCUQAQ&usg=AOvVaw2M-Sx8YU1OXE9no7_r0noP',
        icon: <LinkedinIcon />,
    },
    {
        name: 'X',
        link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://twitter.com/NASA%3Fref_src%3Dtwsrc%255Egoogle%257Ctwcamp%255Eserp%257Ctwgr%255Eauthor&ved=2ahUKEwieq-ndq5aGAxXzk1YBHTGjBeEQ6F56BAgwEAE&usg=AOvVaw3l5kb-9QGWbugCzX17qOHz',
        icon: <TwitterIcon />,
    },
    {
        name: 'Facebook',
        link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.facebook.com/NASA/&ved=2ahUKEwjk9JWjt5aGAxWMqFYBHTF3A3YQFnoECBYQAQ&usg=AOvVaw1ebxbGUSor7JuaT1MBL7l2',
        icon: <FacebookIcon />,
    },
    {
        name: 'Website',
        link: 'https://blogs.nasa.gov/',
        icon: <EarthIcon />,
    },
];

const description =
    'Experience the wonders of space exploration firsthand and journey through the cosmos like never before with NASAs APOD and Nasa Image and Video Library.';

const Footer = () => {
    return (
        <footer className="relative bottom-0 bg-[#191F33] z-50 w-full">
            <div className="px-4 py-4 flex flex-col items-center">
                {/* app logo */}
                <div>
                    <a href="/" className="flex justify-center items-center gap-5 mb-1 text-white">
                        <img
                            src="https://res.cloudinary.com/dyvkdwzcj/image/upload/v1709055594/logo-1_vo1dni.png"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="font-bold text-3xl tracking-wider">Cosmos Of Nasa</span>
                    </a>
                </div>

                {/* description and social links side by side */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-5xl mt-8">
                    {/* description */}
                    <div className="text-white text-center md:text-left font-medium text-lg max-w-xl mb-8 md:mb-0 md:mr-8">
                        <p>{description}</p>
                    </div>

                    {/* social links */}
                    <div>
                        <span className="text-[#767E94] block text-center md:text-left mb-6 font-medium text-lg">
                            Follow
                        </span>
                        <ul className="flex gap-6 items-center justify-center md:justify-start">
                            {socialLinks.map(({ name, icon, link }) => (
                                <li key={name}>
                                    <a
                                        href={link}
                                        title={name}
                                        className="text-white hover:text-[#767e94]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {icon}
                                    </a>
                                    <span className="sr-only">{name} account</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* about author or app/copyrights */}
            <div className="bg-[#2E3447]">
                <div className="text-center px-3 py-3">
                    <span className="text-[#767E94]">
                        Connect with Nasa
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
