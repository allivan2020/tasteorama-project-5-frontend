import css from './ProfileLayout.module.css';
import ProfileTabs from "@/components/Profile/ProfileTabs";

export default function ProfileLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="container">
            <h1 className={css.title}>My Profile</h1>
            <ProfileTabs />
            <div className={css.pageContent}>{children}</div>
        </div>
    );
}