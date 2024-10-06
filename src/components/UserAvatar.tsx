import Image from "next/image";
import React from "react";
import avatarPlaceholder from "@assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

export interface UserAvatarProps {
  avatarUrl: string | undefined | null;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  className,
  size,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square rounded-full flex-none h-fit bg-secondary object-cover",
        className
      )}
    />
  );
}
