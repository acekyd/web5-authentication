<template>
  <div class="bg-white">
    <header class="inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900" v-if="loggedInUserDID" @click="logOut">Log out <span
              aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                    item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                  in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <!-- Section 1: Kickstart landing page -->
    <div v-if="!loggedInUserDID" class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">DIDSocial App</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">An example app to showcase how you can implement building authentication and onboarding with Web5.js SDK using Decentralized Identifiers and Decentralized Web nodes.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="#"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="connectToWeb5">Connect with 🔐DIDLogin</a>
            <a href="https://developer.tbd.website/blog/did-authentication/" class="text-sm font-semibold leading-6 text-gray-900" target="_blank">Learn more <span
                aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Section 1 -->

    <!-- Start of logged in section -->
    <div class="container mx-auto w-1/2" v-else>
        <!-- Section 2: Show DID and confirm additional personal data from DWN -->
        <div class="container mx-auto px-4" v-if="isUserProfileEmpty">
          <form @submit.prevent="updateProfile">
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">Please confirm and update your profile information in your DWN.</p>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div class="mt-2">
                      <input type="text" name="first-name" id="firstName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userProfileForm.firstName" required />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <div class="mt-2">
                      <input type="text" name="last-name" id="lastName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userProfileForm.lastName" required />
                    </div>
                  </div>

                  <div class="sm:col-span-4">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                      <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userProfileForm.email" required />
                    </div>
                  </div>

                  <div class="sm:col-span-2 sm:col-start-1">
                    <label for="nationality" class="block text-sm font-medium leading-6 text-gray-900">Nationality</label>
                    <div class="mt-2">
                      <input type="text" name="nationality" id="nationality" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userProfileForm.nationality" required />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </form>
        </div>   <!-- End of Section 2 -->

          <!-- Section 3: Request app personalization and onboarding specific data -->
        <div v-else-if="isUserPreferencesEmpty" class="container mx-auto px-4">
            <form @submit.prevent="updatePreferences">
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-base font-semibold leading-7 text-gray-900">DIDSocial App Preferences for {{ userProfile.data.firstName }}</h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">Configure custom or app specific onboarding experience.</p>

                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label for="workspaceName" class="block text-sm font-medium leading-6 text-gray-900">Workspace name</label>
                      <div class="mt-2">
                        <input type="text" name="workspaceName" id="workspaceName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="userPreferencesForm.workspaceName" required/>
                      </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                      <label for="colorMode" class="block text-sm font-medium leading-6 text-gray-900">Color Mode</label>
                        <div class="mt-2">
                          <select id="colorMode" name="colorMode" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" v-model="userPreferencesForm.colorMode" required>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                          </select>
                        </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
              </div>
            </form>
          </div>
        <!-- End of Section 3 -->

        <!-- Section 4: Show app specific data -->
        <div v-else>
          <small class="text-blue-600">User completely logged in and onboarded.</small>
          <br />
          <div>
            <div class="px-4 sm:px-0">
              <h3 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal and application details.</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Your DID</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0
                  overflow-hidden text-ellipsis hover:tex hover:overflow-visible hover:break-words">{{ loggedInUserDID }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ userProfile.data.firstName }} {{ userProfile.data.lastName }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ userProfile.data.email }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Nationality</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ userProfile.data.nationality }}</dd>
                  </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Workspace</dt>
                  <dd class="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">{{ userPreferences.data.workspaceName }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Color mode</dt>
                  <dd class="mt-1 text-sm leading-6 text-blue-700 sm:col-span-2 sm:mt-0">{{ userPreferences.data.colorMode }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <!-- End of Section 4 -->
    </div>
    <!-- End of logged in section -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import { Web5 } from '@web5/api';

let web5;
let loggedInUserDID = ref('');
let userProfileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  nationality: '',
});
let userPreferencesForm = ref({
  workspaceName: '',
  colorMode: '',
});

let userProfile = ref({});
let userPreferences = ref({});

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const mobileMenuOpen = ref(false)

const verifyEmptyData = (data) => {
  console.log('Data is: ', data);
  const isEmpty = Object.keys(data).length === 0
  console.log('isEmpty is: ', isEmpty);
  return isEmpty;
}

onBeforeMount(async () => {
  const web5loggedInUserDID = localStorage.getItem('web5loggedInUserDID');
  if (web5loggedInUserDID) {
    loggedInUserDID.value = web5loggedInUserDID;
    await connectToWeb5();
  }
});

const connectToWeb5 = async () => {
  //alert('Connecting to Web5');
   ({ web5, did: loggedInUserDID.value } = await Web5.connect());
  console.log('Our Web5 instance is: ', web5);
  console.log('Our DID is: ', loggedInUserDID.value);

  getUserProfile();
  getUserPreferences();

  localStorage.setItem('web5loggedInUserDID', loggedInUserDID.value);

}

const getUserProfile = async () => {

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema: "http://schema.org/Person",
      }
    }
  })

  console.log('Records are: ', records);

  console.log('Records length is: ', records.length)

  if(records.length > 0) {
    const record = records[0];
    const data = await record.data.json();
    userProfile.value = { record, data, id: record.id };
    console.log('User profile is: ', userProfile);
  }

  else console.log("No profiles found.");
}

const getUserPreferences = async () => {

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema: "http://my-website-schema.org/Preferences",
      }
    }
  })

  console.log('Preferences records are: ', records);

  if (records.length > 0) {
    const record = records[0];
    const data = await record.data.json();
    userPreferences.value = { record, data, id: record.id };
    console.log('User preferences are: ', userPreferences);
  }

  else console.log("No preferences found.");
}

const updateProfile = async () => {
  const userProfileData = {
    ...userProfile.value,
  }

  userProfileData.data = { ...userProfileForm.value }

  console.log('User profile data is: ', userProfileData);

  if (Object.keys(userProfile.value).length === 0) {
    const { record } = await web5.dwn.records.create({
      data: userProfileData.data,
      message: {
        schema: "http://schema.org/Person",
        dataFormat: "application/json",
      },
    });

    console.log('Created profile record is: ', record);

    const data = await record.data.json();
    userProfile.value = { record, data, id: record.id };

    console.log('Completed User profile is: ', userProfile.value);
  }

  else {
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: userProfile.value.id,
        }
      }
    });

    await record.update({ data: userProfileData.data });
  }
}

const updatePreferences = async () => {
  const userPreferencesData = {}
  userPreferencesData.data = { ...userPreferencesForm.value }

  console.log('User preferences data is: ', userPreferencesData);

  if (Object.keys(userPreferences.value).length === 0) {
    const { record } = await web5.dwn.records.create({
      data: userPreferencesData.data,
      message: {
        schema: "http://my-website-schema.org/Preferences",
        dataFormat: "application/json",
      },
    });

    console.log('Created user preferences record is: ', record);

    const data = await record.data.json();
    userPreferences.value = { record, data, id: record.id };

    console.log('Completed User preferences are: ', userPreferences.value);
  }

  else {
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: userPreferences.value.id,
        }
      }
    });

    await record.update({ data: userPreferencesData.data });
  }
}

const isUserProfileEmpty = computed(() => {
  return verifyEmptyData(userProfile.value);
})

const isUserPreferencesEmpty = computed(() => {
  return verifyEmptyData(userPreferences.value);
})

const logOut = () => {
  localStorage.removeItem('web5loggedInUserDID');
  loggedInUserDID.value = '';
  userProfile.value = {};
  userPreferences.value = {};
}

</script>