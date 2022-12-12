import { UserAvatar } from '../managers/UserManager'

export const RosterItem = ({ player, i }) => {

    return (
        <li className={`${(i % 2) ? "bg-gray-50" : "bg-white"} flex items-center justify-between py-3 pl-3 pr-4 text-sm`}>
            <div className="flex w-0 flex-1 items-center">
                <UserAvatar fullName={player.fullName} className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex w-0 flex-1 items-center">
                <div className="h-5 w-5 flex-shrink-0 text-slate-700">
                    {player.fullName}
                </div>
            </div>
                <div className="font-medium text-indigo-600 hover:text-indigo-500">
                    {player.fullName}
                </div>
            <div className="ml-4">
                <span className="ml-2 w-0">Central Midfielder</span>
            </div>
        </li>
    )
}
