import { PaperClipIcon } from '@heroicons/react/20/solid'
import { CurrentUserAvatar } from '../managers/UserManager'

export const RosterItem = ({ player }) => {


    return (
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
            <div className="flex w-0 flex-1 items-center">
                <CurrentUserAvatar className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex w-0 flex-1 items-center">
                <div className="h-5 w-5 flex-shrink-0 text-slate-700" aria-hidden="true">
                    Shane Butler
                </div>
            </div>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Shane Butler
                </a>
            <div className="ml-4">
                <span className="ml-2 w-0">Central Midfielder</span>
            </div>
        </li>
    )
}