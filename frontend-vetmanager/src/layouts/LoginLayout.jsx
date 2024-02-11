import style from './LoginLayout.module.css'
import clsx from 'clsx'

export function LoginLayout({ title, children }) {
    return (
        <main className={style['login-layout']}>
            {children}
        </main>
   )
}