/* Editorial Operating System, small, reusable Framer Motion primitives. The site already has
   CSS keyframe animations for on-load hero moments; these cover what CSS can't do cheaply:
   scroll-triggered reveals as the user scrolls down, and staggered grid/list entrances. */
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ delay }} variants={revealVariants}>{children}</motion.div>;
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const groupTags = { div: motion.div, ol: motion.ol, ul: motion.ul };
const itemTags = { div: motion.div, li: motion.li };

export function StaggerGroup({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: keyof typeof groupTags }) {
  const Tag = groupTags[as];
  return <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerContainer}>{children}</Tag>;
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: keyof typeof itemTags }) {
  const Tag = itemTags[as];
  return <Tag className={className} variants={revealVariants}>{children}</Tag>;
}
