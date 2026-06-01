import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <div key={item.title}>
                        {item.href && (
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}

                        {item.group && (
                            <>
                                <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
                                    {item.title}
                                </div>

                                {item.group.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={
                                                subItem.href
                                                    ? isCurrentUrl(subItem.href)
                                                    : false
                                            }
                                            tooltip={{
                                                children: subItem.title,
                                            }}
                                        >
                                            <Link
                                                href={subItem.href!}
                                                prefetch
                                                className="pl-6"
                                            >
                                                {subItem.icon && (
                                                    <subItem.icon />
                                                )}
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
