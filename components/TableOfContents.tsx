'use client'

import { clsx, type ClassValue } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// export interface PostHeading {
//   value: string // text
//   depth: number
//   url: string // slug
// }

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const TableOfContents = ({ toc }) => {
  const [activeSlug, setActiveSlug] = useState<string>('')

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSlug(`#${entry.target.id}`)
      })
    }

    const option: IntersectionObserverInit = {
      rootMargin: '0px 0px -90% 0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(callback, option)

    const observe = (item) => {
      const element = document.querySelector(`[id="${item.url.substring(1)}"]`)

      if (element) observer.observe(element)
    }

    toc.forEach(observe)

    return () => observer.disconnect()
  }, [toc])

  return (
    <div className="bg-card text-card-foreground sticky mb-4 rounded-lg border lg:w-auto">
      <div className="grid gap-4 p-6 pt-0">
        <nav className="flex items-center self-start" aria-label="Table of Contents">
          <ol className="list-none space-y-3">
            {toc.map((item) => (
              <li
                key={item.url}
                className={cn(
                  'hover:text-accent-foreground list-none text-sm font-bold transition-colors duration-200 ease-in-out',
                  item.depth === 3 && 'ml-6 font-normal',
                  item.depth === 4 && 'ml-8 font-normal',
                  item.depth === 5 && 'ml-10 font-normal',
                  activeSlug === item.url && 'text-accent-foreground'
                )}
              >
                <Link href={`${item.url}`}>{item.value}</Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default TableOfContents
