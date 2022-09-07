import { Link } from "@solidjs/router";
import c from './style.module.css';


export default function Nav() {
  return <div class={c.navArea}>
    <Link href="/" class={c.navLink}>Basic</Link>
    <Link href="/style" class={c.navLink}>Style</Link>
    <Link href="/custom" class={c.navLink}>Custom</Link>
    <Link href="/resource" class={c.navLink}>Resource</Link>
  </div>
}