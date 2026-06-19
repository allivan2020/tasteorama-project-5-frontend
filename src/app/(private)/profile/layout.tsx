import ProfileNavigation from "@/components/ProfileNavigation/ProfileNavigation";
import css from "./ProfileLayout.module.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`container ${css.profile}`}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      <div className={css.pageContent}>{children}</div>
    </section>
  );
}
