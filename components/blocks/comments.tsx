'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function Comments({ path }: { path: string }) {
  const { theme } = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 清理旧的 script
    const oldScript = document.querySelector('#giscus-script');
    if (oldScript) {
      oldScript.remove();
    }

    // 创建新的 script
    const script = document.createElement('script');
    script.id = 'giscus-script';
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'laogou717/NGiscus');
    script.setAttribute('data-repo-id', 'R_kgDOMvw6LA');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOMvw6LM4CiXCA');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'noborder_light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = commentsRef.current;
    if (comments) {
      comments.innerHTML = '';
      comments.appendChild(script);
    }

    return () => {
      const oldScript = document.querySelector('#giscus-script');
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [theme]);

  return (
    <div className={cn("mt-16 pt-8 border-t")}>
      <h2 className="text-2xl font-bold mb-8">评论</h2>
      <div 
        ref={commentsRef}
        className="giscus-wrapper rounded-lg bg-white dark:bg-zinc-900 p-6"
      />
    </div>
  );
} 
