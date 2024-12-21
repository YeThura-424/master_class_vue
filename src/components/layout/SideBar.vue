<template>
  <aside
    :class="[
      'flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]',
      menuOpen ? 'w-52' : 'w-24'
    ]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button @click="toggleMenu" variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks :links="accountLinks" @clickAction="handleAction" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

defineEmits(['taskClicked'])

const { menuOpen, toggleMenu } = useMenu()

const windowWidth = useWindowSize().width

watchEffect(() => {
  if (windowWidth.value > 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})

const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2'
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check'
  }
]

const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  {
    title: 'Settings',
    to: '/setting',
    icon: 'lucide:settings'
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out'
  }
]
const router = useRouter()
const handleAction = async (payload: string) => {
  if (payload == 'Sign Out') {
    // need to import in this function
    // မဟုတ်ရင် pinia create မဖြစ်ခင် store ကိုယူသုံးထားတာဆိုတော့ error တက်မာ
    const { logout } = await import('@/utils/supaAuth')
    const isLoggedOut = await logout()

    if (isLoggedOut) router.push('/login')
  }
}
</script>
