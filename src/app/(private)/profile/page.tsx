//заглушка - тут буде сторінка профілю
import {redirect} from "next/navigation";

export default function ProfilePage() {
  redirect('/profile/own');
}
