export default function AppLogo() {
    return (
        <>
            <div className="flex items-center">
                <img
                    src="/svg/logo.png"
                    alt="VDO Logo"
                    className="h-8 w-auto object-contain"
                />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    VDO
                </span>
            </div>
        </>
    );
}
