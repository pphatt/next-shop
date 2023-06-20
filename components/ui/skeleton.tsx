import styles from '@/styles/components/ui/skeleton.module.scss'
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<any> {
  width: number
  height: number
}

export default function Skeleton({width, height, style, ...props}: SkeletonProps) {
  return (
    <div style={{width: `${width}px`, height: `${height}px`, ...style}} {...props} className={styles["skeleton"]}></div>
  )
}