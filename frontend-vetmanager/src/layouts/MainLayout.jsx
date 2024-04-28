import style from './MainLayout.module.css'
import clsx from 'clsx'

export function MainLayout({ title, children }) {
    return (
        <main className={clsx(style['main-layout'], 'bg-neutral-50', 'dark:bg-gray-800', 'text-neutral-800', 'dark:text-white', 'overflow-scroll')}>
            <nav className={['main-layout__menu']} />

            <h2 className={clsx(style['main-layout__title'], 'text-3xl', 'font-bold', 'mt-8')}>
                {title}
            </h2>

            <search className={style['main-layout__search']} />

            <section className={style['main-layout__content']}>
                {children}
            </section>
        </main>
   )
}